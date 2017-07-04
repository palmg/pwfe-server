/**
 * Created by chkui on 2017/6/6.
 */

import {buildStore} from 'pwfe-dom/flux'
import env from '../common/env'
import {match} from '../common/routes'
import log from '../common/log'
import {exeAction} from '../config/enums'
const reducer = env.getParam("reducer")

/**
 * 从全局配置中获取reducer的配置，并根据配置生成store
 * 1）定义初始化加载的action：[{id:对应routest的id, action:对应的方法}]
 * 2）在调用对应的action时，会传入url中对应的参数。
 *    例如url格式为'/path/:param1/name/:param2。
 *    此时的url为'/path/1/name/bt'。在调用action时会使用以下格式
 *    action({
 *       param1:'1',
 *       param2:'bt'
 *    })
 * 3）使用路由时一定要指定前缀，
 *    例如路径可以设定为：/path/:param1或/path/:param1/name/:param2或/path/:param1/:param2
 *    但是不能为：/:param1/:param2
 * @param ctx
 * @param next
 * @return {*}
 */
async function reduxStore(ctx, next) {
    const matchUrl = match(ctx.url)
    if (matchUrl) {
        try {
            ctx.fluxStore = await new Promise((resolve, reject)=> {
                    const store = buildStore(reducer),
                        exeList = getAction(matchUrl)
                    if (exeList && 0 < exeList.length) {
                        let exeCount = 0, length = 0
                        for (let act of exeList) {
                            length += act.count || exeAction.defCount
                        }
                        store.subscribe(()=> {
                            if (++exeCount === length) {
                                resolve(store);
                            }
                        })
                        for (let act of exeList) {
                            store.dispatch(act.action(matchUrl.params))
                        }
                    } else {
                        resolve(store);
                    }
                }
            )
        }catch (err){
            log('process fluxStore error', err)
        }
        ctx.match = matchUrl
        return next();
    } else {
        return next();
    }
}

/**
 * 获取当前路由对应的action
 * @param match
 * @return {boolean}
 */
const getAction = (match) => {
    const id = match.id,
        exeAction = env.getParam('exeAction')
    let exe = false
    if (exeAction) {
        exe = []
        for (let act of exeAction) {
            (act.id === exeAction.all || act.id === id) && exe.push(act)
        }
    }
    return exe
}

module.exports = reduxStore
