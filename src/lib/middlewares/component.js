/**
 * Created by chkui on 2017/6/6.
 */

import env from '../common/env'
const routes = env.getParam("routes")
const reRoutes = routes.map(i=> {
    const pos = i.url.indexOf(':') - 1;
    i.suffix = 0 < pos
    i.suffix && (i.url = i.url.substring(0, pos))
    return i
})


/**
 * 初始化入口页面的工具，必须保证路由配置(routes)符合配置规范
 * @param ctx
 * @param next
 * @return {*}
 */
async function component(ctx, next) {
    if (ctx.fluxStore) {
        for (let i of reRoutes) { //从全局配置中获取路由列表
            if ((!i.suffix && i.url === ctx.url) || (i.suffix && ctx.url.startsWith(i.url))) {
                ctx.initComp = await new Promise((resolve, reject)=> {
                    i.component((Comp)=> {
                        resolve(Comp);
                    })
                })
                ctx.initId = i.id; //设置当前组件ID
                ctx.initName = i.name;
                return next();
            }
        }
    } else {
        return next();
    }
}

module.exports = component
