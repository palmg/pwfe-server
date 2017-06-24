'use strict';

var path = require('path'),
    fs = require('fs'),
    env = require('../common/env'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    dir = env.getParam('workDir'),
    serverModule = env.getParam('serverModule'),
    serverEntry = {}; //服务器打包的entry

var clientConfig = void 0,
    serverConfig = void 0;
serverEntry[env.getParam('serverEntryName')] = env.getParam('serverEntry'); //设定服务器的打包入口

var externals = serverModule ?
//打服务器文件包时，排除所有node_module文件
function () {
    return fs.readdirSync(path.resolve(dir, serverModule)).filter(function (filename) {
        return !filename.includes('.bin');
    }).reduce(function (externals, filename) {
        externals[filename] = 'commonjs ' + filename;
        return externals;
    }, {});
} : function () {},
    defined = Object.assign({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }, env.getParam('define')),
    clientPlugins = [new webpack.optimize.OccurrenceOrderPlugin(), new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: env.getParam('chunkFileName'),
    children: true
}), new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
}), new webpack.DefinePlugin(defined), new HtmlWebpackPlugin({
    filename: path.resolve(dir, env.getParam('outPath'), env.getParam('viewPath'), env.getParam('htmlFileName')), //workDir + path + name
    template: path.resolve(dir, env.getParam('htmlTemplatePath'))
}), new ExtractTextPlugin({
    filename: env.getParam('cssFileName'),
    allChunks: true
})];

env.getParam('compressJs') && clientPlugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    comments: false
}));

env.getParam('mergingChunk') && function () {
    clientPlugins.push(new webpack.optimize.AggressiveMergingPlugin());
    clientPlugins.push(new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 35, //TODO 暂未提供配置
        minChunkSize: 1000 //TODO 暂未提供配置
    }));
    clientPlugins.push(new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 10000 //TODO 暂未提供配置
    }));
}();

clientConfig = {
    devtool: env.getParam('sourceMap'),
    context: dir,
    entry: {
        bundle: env.getParam('entry'),
        vendor: env.getParam('vendor')
    },
    output: {
        path: path.resolve(dir, env.getParam('outPath'), env.getParam('clientPath')),
        filename: env.getParam('fileName'),
        chunkFilename: env.getParam('chunkFileName'),
        publicPath: env.getParam('publicPath')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['transform-runtime', 'add-module-exports'],
                    cacheDirectory: true
                }
            }]
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?' + env.getParam('cssLoadRule'), {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function plugins() {
                            return [require('autoprefixer')()];
                        }
                    }
                }, 'sass-loader']
            })
        }, {
            test: /\.(png|jpg|svg)$/,
            use: ['url-loader?limit=25000']
        }, {
            test: /\.json$/,
            use: ['json-loader']
        }, {
            test: /\.html$/,
            use: ['html-loader?minimize=false']
        }]
    },
    plugins: clientPlugins
};
serverConfig = {
    context: dir,
    entry: serverEntry,
    output: {
        path: path.resolve(dir, env.getParam('outPath'), env.getParam('serverPath')),
        filename: '[name].js', //由于是在本地使用，固定按照文件名称输出
        chunkFilename: 'chunk.[name].js' //固定按照分片名字输出
    },
    target: 'node', //指定服务器运行环境为node
    node: {
        __filename: true, //使用相对于本地的路径
        __dirname: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['transform-runtime', 'add-module-exports'],
                    cacheDirectory: true
                }
            }]
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?' + env.getParam('cssLoadRule'), {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function plugins() {
                            return [require('autoprefixer')()];
                        }
                    }
                }, 'sass-loader']
            })
        }, {
            test: /\.(png|jpg|svg)$/,
            use: ['url-loader?limit=25000']
        }, {
            test: /\.json$/,
            use: ['json-loader']
        }]
    },
    externals: externals(),
    plugins: [new webpack.optimize.OccurrenceOrderPlugin(), new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        comments: false
    }), new webpack.DefinePlugin(defined), new ExtractTextPlugin({
        filename: env.getParam('cssFileName'),
        allChunks: true
    })]
};

module.exports = [clientConfig, serverConfig];