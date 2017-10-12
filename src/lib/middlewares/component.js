/**
 * Created by chkui on 2017/6/6.
 */
import RenderFacade from './util/facade'
import cache from '../common/cache'

/**
 * 初始化入口页面的工具，必须保证路由配置(routes)符合配置规范
 * @param ctx
 * @param next
 * @return {*}
 */
async function component(ctx, next) {
    await process.execute(ctx)
    return next();
}

const process = new function () {
    const _this = this
    const render = (cb) => {
        const route = _this.ctx.route
        route.component((Comp) => {
            _this.ctx.initComp = Comp
            _this.ctx.initId = route.id //设置当前组件ID
            _this.ctx.initName = route.name //设置主键名称
            _this.ctx.url = route.url //设置匹配url
            cb();
        })
    }
    this.facade = new RenderFacade(
        {
            render: (res, rej) => {
                render(res)
            },
            cache: (res, rej) => {
                const value = cache.get(_this.ctx.route.id) //获取缓存，缓存结构{html:,store:,component}
                if (value && value.component) {
                    _this.ctx.initComp = value.component
                    res()
                } else {
                    render(res)
                }
            }
        }
    )
    this.execute = function (ctx) {
        this.ctx = ctx
        return this.facade.execute(this.ctx)
    }
}

module.exports = component
