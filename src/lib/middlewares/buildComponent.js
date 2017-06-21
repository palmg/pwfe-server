/**
 * Created by chkui on 2017/6/6.
 */

import {routes} from '../../src/routes'

/**
 * 创建一个用于初始构建的页面Component
 * @param ctx
 * @param next
 * @return {*}
 */
async function buildComponent(ctx, next) {
    if (ctx.fluxStore) {
        for(let i of routes){
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


export default buildComponent
