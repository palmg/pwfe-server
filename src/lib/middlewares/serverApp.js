import React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import env from '../common/env'

const App = env.getParam('app')(),
    routes = env.getParam('routes')
/**
 * 在服务端创建react渲染入口lo
 * @param ctx
 * @param next
 */
async function serverApp(ctx, next) {
    const context = {};
    if (ctx.fluxStore) { //必须要有sotre才能进行渲染
        ctx.reactDom = renderToString(
            <Provider store={ctx.fluxStore}>
                <StaticRouter location={ctx.url} context={context}>
                    <App init={{comp: ctx.initComp, id: ctx.initId}} routes={routes} />
                </StaticRouter>
            </Provider>)
    }
    await next()
}

module.exports = serverApp
