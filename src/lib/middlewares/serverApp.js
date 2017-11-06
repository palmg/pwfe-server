import React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import env from '../common/env'
import {getRoutes} from '../common/routes'
import RenderFacade from './util/facade'
import cache from '../common/cache'

const App = env.getParam('app')(),
    children = env.getParam('children'),
    Children = children && children(),
    header = env.getParam('header'),
    Header = header && header(),
    footer = env.getParam('footer'),
    Footer = footer && footer()
console.log('Children', Children)

/**
 * 在服务端创建react渲染入口
 * 1)react-route的StaticRouter有个坑，如果URL=/path/:param这种形式传递参数，则内部的route不会渲染
 * @param ctx
 * @param next
 */
async function serverApp(ctx, next) {
    await process.execute(ctx)
    return next();
}

/**
 * 处理过程实例。由于未使用原型方法禁止初始化多个实例，单例模式。
 */
const process = new function () {
    const _this = this
    const render = () => {
        const context = {};
        try {
            console.log(_this.ctx.fluxStore)
            _this.ctx.reactDom = renderToString(
                <Provider store={_this.ctx.fluxStore}>
                    <StaticRouter location={_this.ctx.url} context={context}>
                        <App init={{comp: _this.ctx.initComp, id: _this.ctx.initId}}
                             routes={getRoutes()}
                             header={Header}
                             footer={Footer}>
                            {Children}
                        </App>
                    </StaticRouter>
                </Provider>)
        } catch (err) {
            console.error("create React dom error:", err)
            _this.ctx.isRender = false
        }
    }
    this.facade = new RenderFacade(
        {
            render: (res, rej) => {
                render()
                res()
            },
            cache: (res, rej) => {
                const value = cache.get(_this.ctx.originalUrl) //获取缓存，缓存结构{html:,store:,component:}
                value && value.html ? (_this.ctx.reactDom = value.html) : render()
                res()
            }
        }
    )
    this.execute = function (ctx) {
        this.ctx = ctx
        return this.facade.execute(this.ctx)
    }
}

module.exports = serverApp
