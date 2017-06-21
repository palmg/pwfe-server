/**
 * Created by chkui on 2017/6/6.
 */

import env from '../common/env'
const routes = env.getParam("routes")

/**
 * 初始化入口页面的工具，必须保证路由配置(routes)符合配置规范
 * @param ctx
 * @param next
 * @return {*}
 */
async function component(ctx, next) {
    if (ctx.fluxStore) {
        for(let i of routes){ //从全局配置中获取路由列表
            if(i.url === ctx.url){
                ctx.initComp = await new Promise((resolve, reject)=> {
                    i.component((Comp)=>{
                        resolve(Comp);
                    })
                })
                ctx.initId = i.id; //设置当前组件ID
                return next();
            }
        }
    }else {
        return next();
    }
}

module.exports = component
