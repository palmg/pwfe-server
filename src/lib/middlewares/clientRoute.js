import React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from '../../src/app'
async function clientRoute(ctx, next) {
    const context = {};
    let dom;//渲染之后的DOM
    if (ctx.fluxStore) { //必须要有sotre才能进行渲染
        dom = renderToString(
            <Provider store={ctx.fluxStore}>
                <StaticRouter location={ctx.url} context={context}>
                    <App init={{comp: ctx.initComp, id: ctx.initId}}/>
                </StaticRouter>
            </Provider>)
    }
    if (dom) {
        await ctx.render('index', {
            root: dom,//初始化Html
            state: ctx.fluxStore.getState(), //redux数据
            params: { //服务器参数
                initPath: ctx.url, //初始化访问的URL
                initId: ctx.initId //初始化访问的页面组件id
            }
        })
    } else {
        await next()
    }
}

export default clientRoute
