/**
 * Created by chkui on 2017/6/6.
 */

import {buildStore} from 'pwfe-dom/flux'
import {reducer} from '../../config/reducer'

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
