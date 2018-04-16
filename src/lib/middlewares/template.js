import RenderFacade from "./util/facade";
import cache from "../common/cache";

/**
 * 模板化替换工具，会根据HTML的内容替换指定内容。 //TODO 目前仅仅支持纯文本替换，还未支持表达式
 * 替换方式：
 * 页面模板：
 * <html>
 *    <head>
 *        //在某些页面不存在，则需要用 if(typeof(myKey) !== 'undefined')的方式来判断。
 *        //不能直接用 if(myKey)的方式，因为nodejs环境运行时myKey不存在的话会直接抛出异常。
 *        <% if (typeof(myKey) !== 'undefined') { %><%- myKey %><% }%>
 *    </head>
 * </html>
 * 返回值：
 * {key:'myValue'}
 * 模板上<%- myKey %>部分会被替换为myValue。
 *
 * route上必须配置template执行方法：
 * routes[{template:(url:当前路由的url, params:当前页面访问参数, state:redux里的数据状态)=>{}}]
 *
 * @param ctx 处理上下文
 * @param next 执行
 * @returns {Promise.<*>}
 */
async function template(ctx, next) {
    await process.execute(ctx)
    return next();
}

const process = new function () {//EXECUTE ACTIONS
    const _this = this;

    const render = async (cb) => {
        const ctx = _this.ctx,
            route = ctx.route,
            templateFoo = route.renderTemplate;
        if(templateFoo){
            let k_v = {};
            for(let foo of templateFoo){
                const temp = await foo(route.url, route.params, ctx.fluxStore.getState());
                k_v = Object.assign(k_v, temp);
                console.log(k_v);
            }
            ctx.template = k_v;
        }
        cb();
    };

    this.facade = new RenderFacade(
        {
            render: (res, rej) => {
                render(res)
            },
            cache: (res, rej) => {
                const value = cache.get(_this.ctx.originalUrl)
                //判定缓存中是否已经有SEO信息
                value && value.template ? (_this.ctx.template = value.template, res()) : render(res)
            }
        }
    )
    this.execute = function (ctx) {
        this.ctx = ctx;
        return this.facade.execute(this.ctx)
    }
}

module.exports = template
