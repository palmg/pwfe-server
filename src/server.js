/**
 * Created by chkui on 2017/6/21.
 */

require('babel-polyfill')
const init = require('./lib/common/init'),
    log = require('./lib/common/log')

/**
 * 生产服务器打包或运行入口
 * 1）必须设置 app。
 * 2）必须设置 routes。
 * @param {object} options {
 *
 * }
 */
const server = (options) => {
    log("init server!")
    options.isProd = true
    //初始化环境参数
    init(options)
    //加载服务器运行
    require('./lib/prod/server')
}

module.exports = server
