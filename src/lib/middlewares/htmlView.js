import React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import env from '../common/env'
const App = env.getParam('app')

/**
 * 进行html模板渲染
 * @param ctx
 * @param next
 */
async function htmlView(ctx, next) {
    if (ctx.reactDom) {
        await ctx.render('index', {
            root: ctx.reactDom,//初始化Html
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

export default htmlView
