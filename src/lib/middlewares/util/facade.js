/**
 * Created by chkui on 2017/10/11.
 */

/**
 * 用于中间件执行的facade模式。
 * 1）用于适配中间件'匹配'、'渲染'、'缓存'三个模式，并为未来扩展更多的模式提供接口。
 * 2）所有的传入方法必须是一个Promise回调。
 * 未解决的问题：//TODO
 * 1）暂未实现 async 和 await 所以无法在模式方法内部使用第三方koa中间件。
 *    可以考虑使用co工具替换Promise，但是性能堪忧。
 * @param {object} options {
 *     noRender：不必渲染时执行的方法
 *     render： 渲染时执行的方法
 *     cache: 需要缓存时执行的方法
 * }
 * @constructor
 */
const RenderFacade = function (options = {}) {
    this.call = {
        noRender: options.noRender ? options.noRender : none,
        render: options.render ? options.render : none,
        cache: options.cache ? options.cache : none
    }
}
RenderFacade.prototype.noRender = function () {
    return new Promise(this.call.noRender)
}
RenderFacade.prototype.render = function () {
    return new Promise(this.call.render)
}
RenderFacade.prototype.cache = function () {
    return new Promise(this.call.cache)
}
RenderFacade.prototype.execute = function (ctx) {
    if (ctx.isRender && ctx.isCache) {
        return this.cache()
    }
    else if (ctx.isRender) {
        return this.render()
    }
    else {
        return this.noRender()
    }
}
export default RenderFacade

const none = (resolve, reject) =>{resolve()}

