/**
 * Created by chkui on 2017/6/21.
 */
require('babel-polyfill')

// Node babel source map support
require('source-map-support').install()

// Javascript require hook
require('babel-register')({
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['add-module-exports']
})

// Css require hook
require('css-modules-require-hook')({
    extensions: ['.scss'],
    preprocessCss: (data, filename) =>
        require('node-sass').renderSync({
            data,
            file: filename
        }).css,
    camelCase: true,
    generateScopedName: '[name]-[local]'
})

// Image require hook
require('asset-require-hook')({
    name: '/[hash].[ext]',
    extensions: ['jpg', 'png', 'gif', 'svg'],
    limit: 25000
})

/**
 * 测试服务器入口
 * @param {object} options {
 *
 * }
 */
const devServer = (options) =>{
    const env = require('./lib/common/env');
    console.log(options.workDir)
    env.setParam("workDir", options.workDir)
    require('./lib/dev/server')
}

module.exports = devServer
