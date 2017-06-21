const path = require('path'),
    webpack = require('webpack'),
    env = require('../common/env'),
    vendor = env.getParam('vendor'),
    entry = env.getParam('entry'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin'),
    dir = env.getParam('workDir')
entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000')
console.log(vendor)

module.exports = {
    devtool: 'source-map',
    context: dir,
    entry: {
        bundle: entry,
        vendor: vendor
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0', 'react','react-hmre'] ,
                    plugins: ['transform-runtime', 'add-module-exports'],
                    cacheDirectory: true
                }
            }]
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader?modules&camelCase&importLoaders=1&localIdentName=[name]-[local]',
                {
                    loader:'postcss-loader',
                    options: {
                        plugins: function() {
                            return [
                                require('autoprefixer')()
                            ];
                        }
                    }
                },
                'sass-loader'
            ]
        }, {
            test: /\.(png|jpg|svg)$/,
            use:['url-loader?limit=25000']
        }, {
            test: /\.json$/,
            use: ['json-loader']
        }, {
            test: /\.html$/,
            use: ['html-loader?minimize=false']
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].js'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title:'马良行',
            filename: path.resolve(dir, env.getParam('htmlFilePath')),
            template: path.resolve(dir, env.getParam('htmlTemplatePath'))
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            '__RunMode':JSON.stringify("SITE"),
            __Local:true //本地模式
        }),
        new ProgressBarPlugin({summary: false})
    ]
}
