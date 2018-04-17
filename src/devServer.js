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
    extensions: ['.scss','css'],
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

const init = require('./lib/common/init'),
    log = require('./lib/common/log')

/**
 * 本地开发服务器入口
 * 1）必须设置 app。
 * 2）必须设置 routes。
 * @param {object} options {
 *     //options的配置详见 {./config/context}
 * }
 */
const devServer = (options) => {
    log("init server!")
    //初始化环境参数
    init(options)
    //加载服务器运行
    require('./lib/dev/server')
}

module.exports = devServer
