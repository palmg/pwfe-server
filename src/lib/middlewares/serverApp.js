import React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import env from '../common/env'
import {getRoutes} from '../common/routes'

const App = env.getParam('app')(),
    children = env.getParam('children'),
    Children = children && children()

/**
 * 在服务端创建react渲染入口
 * 1)react-route的StaticRouter有个坑，如果URL=/path/:param这种形式传递参数，则内部的route不会渲染
 * @param ctx
 * @param next
 */
async function serverApp(ctx, next) {
    const context = {};
    if (ctx.fluxStore) { //必须要有sotre才能进行渲染
        ctx.reactDom = renderToString(
            <Provider store={ctx.fluxStore}>
                <StaticRouter location={ctx.url} context={context}>
                    <App init={{comp: ctx.initComp, id: ctx.initId}} routes={getRoutes()}>
                        {Children && <Children />}
                    </App>
                </StaticRouter>
            </Provider>)
    }
    await next()
}

module.exports = serverApp
