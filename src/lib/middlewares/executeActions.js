/**
 * Created by chkui on 2017/6/6.
 */
import RenderFacade from "./util/facade";
import cache from "../common/cache";

/**
 * 首屏渲染，服务器端执行redux action 方法，主动更新state
 * 需要服务器端更新state的，在每个route配置增加：
 * renderActions: {//服务器端渲染actions
        actions: [//action 列表
            {
                action: requestPolicy//action 的方法
            },{
                action: requestComp4,//action 的方法
                params: ['param1', 'param1'] //可选，注意参数的先后顺序，restful 中的占位符名称 这里对应这'/comp3/:param1'的feng
            }
        ], dispathCount: 3 //actions 列表中对应的dispath次数
    }
 * @param ctx
 * @param next
 * @return {*}
 */
async function executeActions(ctx, next) {
    await process.execute(ctx)
    return next();
}

const process = new function () {//EXECUTE ACTIONS
    const _this = this

    //执行action
    const execute = async function(renderActions, cb){
        const ctx = _this.ctx,
            store = ctx.fluxStore,
            actions = renderActions.actions

        for(let {action, params, input = []} of actions){
            params && params.forEach(param=>{
                //当param = {type:"url",value:"param"}这样的对象时
                if (param && "object" === typeof param) {
                    if (param.type === "url" && param.value) {
                        input.push(ctx.route.params[param.value])
                    } else {
                        input.push(param.value)
                    }
                } else {
                    //当param为String时，默认是url中提取参数
                    param && "string" === typeof param && input.push(ctx.route.params[param])
                }
            })
            await store.dispatch(action(...input))
        }
        //表示已经执行完毕
        _this.ctx.dispathCount = 1
        cb()
    }

    const render = (cb) => {
        const route = _this.ctx.route
        //调用route actions列表 注意cb()
        route.renderActions && route.renderActions.actions && route.renderActions.actions.length ? execute(route.renderActions, cb) : cb()
    }

    this.facade = new RenderFacade(
        {
            render: (res, rej) => {
                //execute routes renderActions list
                //listener store modify
                render(res)
            },
            cache: (res, rej) => {
                const value = cache.get(_this.ctx.originalUrl)
                value && value.dispathCount ? (_this.ctx.dispathCount = value.dispathCount, res()) : render(res)
            }
        }
    )
    this.execute = function (ctx) {
        this.ctx = ctx
        return this.facade.execute(this.ctx)
    }
}

module.exports = executeActions
