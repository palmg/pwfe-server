/**
 * Created by chkui on 2017/6/6.
 */

import {buildStore} from 'pwfe-dom/flux'
import env from '../common/env'
const reducer = env.getParam("reducer")

/**
 * 从全局配置中获取reducer的配置，并根据配置生成store
 * @param ctx
 * @param next
 * @return {*}
 */
async function createStore(ctx, next) {
    if (ctx.fluxStore || ctx.url.endsWith(".json") || ctx.url.endsWith(".js") || ctx.url.endsWith(".map") || ctx.url.endsWith(".html") || ctx.url.endsWith("__webpack_hmr")) {
        return next();
    } else {
        ctx.fluxStore = await new Promise((resolve, reject)=> {
            const store = buildStore(reducer);
            resolve(store);
        })
        return next();
    }
}


export default createStore
