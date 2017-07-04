/**
 * Created by chkui on 2017/6/6.
 */

import {match} from '../common/routes'

/**
 * 初始化入口页面的工具，必须保证路由配置(routes)符合配置规范
 * @param ctx
 * @param next
 * @return {*}
 */
async function component(ctx, next) {
    if (ctx.match && ctx.fluxStore) {
        const match = ctx.match
        ctx.initComp = await new Promise((resolve, reject)=> {
            match.component((Comp)=> {
                resolve(Comp);
            })
        })
        ctx.initId = match.id //设置当前组件ID
        ctx.initName = match.name //设置主键名称
        ctx.url = match.url //设置匹配url
        return next();
    } else {
        return next();
    }
}

module.exports = component
