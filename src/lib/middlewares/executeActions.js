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
    const execute = (renderActions, cb) => {
        let context = _this.ctx
        //监听state变化
        _this.ctx.fluxStore.subscribe(() => {
            //获取当前router dispath条数
            let count = context.dispathCount ? ++context.dispathCount : (context.dispathCount = 1)
            renderActions.dispathCount && count === renderActions.dispathCount && cb()
        })

        let actions = renderActions.actions

        //遍历每个action执行
        for (let methodObj of actions) {
            let action = methodObj.action
            // 获取restfull 对应参数的值，作为参数
            let params = []
            methodObj.params && methodObj.params.map(param => {
                //当param = {type:"url",value:"param"}这样的对象时
                if (param && "object" === typeof param) {
                    if (param.type === "url" && param.value) {
                        params.push(context.route.params[param.value])
                    } else {
                        params.push(param.value)
                    }
                } else {
                    //当param为String时，默认是url中提取参数
                    param && "string" === typeof param && params.push(context.route.params[param])
                }
            })
            //传参&执行action
            action && "function" === typeof action && action(...params)(_this.ctx.fluxStore.dispatch)
        }
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
