/**
 * Created by chkui on 2017/6/6.
 */

import {buildStore} from 'pwfe-dom/flux'
import env from '../common/env'
import {match} from '../common/routes'
import log from '../common/log'
import {renderRuleEnum} from '../config/enums'

const reducer = env.getParam("reducer"),
    suffixAlias = env.getParam('suffixAlias'),
    renderRule = renderRuleEnum[env.getParam('renderRule')],
    reg = new RegExp(suffixAlias)

/**
 * 从全局配置中获取reducer的配置，并根据配置生成store
 * 1）定义初始化加载的action：[{id:对应routest的id, action:对应的方法}]
 * 2）在调用对应的action时，会传入url中对应的参数。
 *    例如url格式为'/path/:param1/name/:param2。
 *    此时的url为'/path/1/name/bt'。在调用action时会使用以下格式
 *    action({
 *       param1:'1',
 *       param2:'bt'
 *    })
 * 3）使用路由时一定要指定前缀，
 *    例如路径可以设定为：/path/:param1或/path/:param1/name/:param2或/path/:param1/:param2
 *    但是不能为：/:param1/:param2
 * 4）执行完毕中间件后，ctx中会增加isRender、match、fluxStore三个参数。
 *    isRender {boolean}表示是否需要服务器端渲染，
 *    route {object} 表示当前路由
 *    fluxStore {object} 当前加载完毕的store数据。
 *    如果没有以上任何参数，表示访问的路由并不在路由列表中
 * @param ctx
 * @param next
 * @return {*}
 */
async function reduxStore(ctx, next) {
    const split = ctx.url.split('?'),
        url = split && 0 < split.length ? split[0] : ctx.url,
        route = match(url)
    if (route && isRender(ctx, route)) {
        try {
            ctx.fluxStore = await new Promise((resolve, reject) => {
                    const store = buildStore(reducer) //TODO 还未加入action执行方法
                    resolve(store);
                }
            )
            ctx.route = route
        } catch (err) {
            log('process fluxStore error', err)
            ctx.isRender = false
        }
        return next();
    } else {
        return next();
    }
}

const isRender = (ctx, route) => {
    ctx.isMatch = true
    ctx.isRender = ((renderRule === renderRuleEnum.blacklisting && !route.renderRule) ||
        (renderRule === renderRuleEnum.whitelisting && route.renderRule))
    return ctx.isRender
}

module.exports = reduxStore
