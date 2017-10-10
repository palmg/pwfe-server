/**
 * Created by chkui on 2017/6/6.
 */

/**
 * 初始化入口页面的工具，必须保证路由配置(routes)符合配置规范
 * @param ctx
 * @param next
 * @return {*}
 */
async function component(ctx, next) {
    if (ctx.isRender) {
        const route = ctx.route
        ctx.initComp = await new Promise((resolve, reject)=> {
            route.component((Comp)=> {
                resolve(Comp);
            })
        })
        ctx.initId = route.id //设置当前组件ID
        ctx.initName = route.name //设置主键名称
        ctx.url = route.url //设置匹配url
        return next();
    } else {
        return next();
    }
}

module.exports = component
