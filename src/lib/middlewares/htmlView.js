import React from 'react'
import RenderFacade from './util/facade'
import cache from '../common/cache'
import env from '../common/env'

const App = env.getParam('app')

/**
 * 进行html模板渲染的组件。
 * @param ctx
 * @param next
 */
async function htmlView(ctx, next) {
    if (ctx.isMatch) {
        //获取React静态文本和redux状态数据
        const data = getData(ctx)
        writeCache(ctx) //写缓存
        await ctx.render('index', {
            title: ctx.initName || env.getParam('defPageName'),
            root: data.document,//初始化Html
            state: data.state, //redux数据
            seo: data.seo, //seo数据
            params: { //服务器参数
                initPath: ctx.url, //初始化访问的URL
                initId: ctx.initId //初始化访问的页面组件id
            }
        })
    } else {
        return next()
    }
}

/**
 * 从上下文获取数据
 * @param {object} ctx koa单次请求的上下文(request context)
 * @returns {object} {document:React渲染的HTML文本, state:store中的状态数据}
 */
const getData = (ctx) => {
    return ctx.isRender ? {document: ctx.reactDom, state: ctx.fluxStore.getState(), seo: ctx.seo} : {document: '', state: {}, seo :{}}
}

/**
 * 写缓存
 * @param ctx
 */
const writeCache = (ctx) => {
    if (ctx.isCache) {
        const key = ctx.originalUrl
        //写缓存，缓存结构{html:,store:,component:}
        cache.get(key) || cache.set(key, {
            html: ctx.reactDom,
            store: ctx.fluxStore,
            component: {comp: ctx.initComp , id: ctx.initId},
            dispathCount: ctx.dispathCount,
            seo : ctx.seo
        }, ctx.isCache.ttl)
    }
}

module.exports = htmlView
