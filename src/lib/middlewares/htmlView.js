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
        const data = getData(ctx),
            template = data.template;
        writeCache(ctx) //写缓存
        const options = {
            root: data.document,//react渲染的html
            state: data.state, //redux数据
            params: { //服务器相关参数
                initPath: ctx.url, //初始化访问的URL
                initId: ctx.initId //初始化访问的页面组件id
            }
        }
        for(let key in template){
            options[key] = template[key];
        }
        options.title = options.title || env.getParam('defPageName');
        await ctx.render('index', options);
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
    return ctx.isRender ?
        {document: ctx.reactDom, state: ctx.fluxStore.getState(), template: ctx.template} :
        {document: '', state: {}, template: {}, renderActions: false}
}

/**
 * 写缓存
 * @param ctx
 */
const writeCache = (ctx) => {
    if (ctx.isCache) {
        const key = ctx.originalUrl;
        //写缓存，缓存结构{html:,store:,component:}
        cache.get(key) || cache.set(key, {
            html: ctx.reactDom,
            store: ctx.fluxStore,
            component: {comp: ctx.initComp, id: ctx.initId},
            renderActions: ctx.renderActions,
            seo: ctx.seo
        }, ctx.isCache.ttl)
    }
}

module.exports = htmlView
