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

/**
 * store监听代理类，监控store的变更并回掉监听方法
 * @param store
 * @constructor
 */
function StoreProxy(store) {
    const _this = this;
    _this.store = store;
    _this.wrapperListener = false;
    _this.innerListener = function () {
        _this.wrapperListener && _this.wrapperListener(_this.store.getState())
    };
    store.subscribe(_this.innerListener);
}
StoreProxy.prototype.addListener = function (listener) {
    this.wrapperListener = listener;
};
StoreProxy.prototype.dispatch = function (result) {
    this.store.dispatch(result);
};

const process = new function () {//EXECUTE ACTIONS
    const _this = this

    //执行action
    const execute = async function(actions, cb){
        const ctx = _this.ctx,
            route = ctx.route,
            store = ctx.fluxStore
        //轮流调用Actions。
        //每一个Action必须返回一个promise。处理完毕之后自行回掉
        //调用Action时会传入当前url，params:匹配的参数{key:value}, storeProxy; redux 的store代理对象，提供監聽和狀態修改回掉
        for(let action of actions){
            const storeProxy = new StoreProxy(store);
            await action(route.url, route.params, storeProxy)
        }
        ctx.renderActions = true;
        cb()
    }

    const render = (cb) => {
        const route = _this.ctx.route
        //调用route actions列表 注意cb()
        route.renderActions && route.renderActions.length ? execute(route.renderActions, cb) : cb()
    }

    this.facade = new RenderFacade(
        {
            render: (res, rej) => {
                render(res)
            },
            cache: (res, rej) => {
                const value = cache.get(_this.ctx.originalUrl)
                value && value.renderActions ? (_this.ctx.renderActions = value.renderActions, res()) : render(res)
            }
        }
    )
    this.execute = function (ctx) {
        this.ctx = ctx
        return this.facade.execute(this.ctx)
    }
}

module.exports = executeActions
