import React from 'react'
import {renderToString} from 'react-dom/server'
import env from '../common/env'

const App = env.getParam('app')

/**
 * 进行html模板渲染的组件。
 * @param ctx
 * @param next
 */
async function htmlView(ctx, next) {
    let document = '', state = {}
    if (ctx.isMatch) {
        if (ctx.isRender) {
            document = ctx.reactDom
            state = ctx.fluxStore.getState()
        }
        await ctx.render('index', {
            title: ctx.initName || env.getParam('defPageName'),
            root: document,//初始化Html
            state: state, //redux数据
            params: { //服务器参数
                initPath: ctx.url, //初始化访问的URL
                initId: ctx.initId //初始化访问的页面组件id
            }
        })
    }else{
        await next()
    }
}

module.exports = htmlView
