/**
 * Created by chkui on 2017/7/3.
 * 用于重构routes的结构。
 * reRoute会重新组织路由列表。
 * 1）解决StaticRouter无法路由url=/path/:param这种格式的参数的问题
 * 2）从url中匹配模块渲染id
 */
import env from '../common/env'
const routes = env.getParam("routes")

/**
 * 根据url的参数获取匹配表达式，
 * 1）如果url中不包含/path/:param这种格式的参数，那么返回的false。
 * 2）如果包含，返回{url:/path/PALMSERVER,match:正则匹配表达式,paramPos:参数位置}
 * @param url
 */
const getRegExp = (url) => {
    const array = []
    let ret
    getRegPosArray(url, array, 0)
    ret = array.length ? buildRegExp(url, array) : false
    return ret
}

const getRegPosArray = (url, posArray, start) => {
    const pos = url.indexOf(':', start);
    -1 < pos && posArray.push(pos) && getRegPosArray(url, posArray, pos + 1)
}

/**
 * 创建匹配表达式
 * @param url
 * @param posArray
 * @return {{url: string, match: RegExp}}
 */
const buildRegExp = (url, posArray) => {
    let start = 0, matchStr = '^', exportUrl = ''
    const array = [], keys = []
    for (let end of posArray) {
        const str = url.substring(start, end)
        array.push(str)
        start = url.indexOf('/', end);
        -1 === start && (start = url.length)
        keys.push({
            prePart: str,
            key: url.substring(end + 1, start),
            matchStr: str + '(\\w+)'
        })
    }
    let count = 0;
    for (let str of array) {
        matchStr += str + '\\w+'
        exportUrl += str + keys[count++].key
    }
    matchStr += '$'
    return {
        url: exportUrl,
        match: new RegExp(matchStr),
        keys: keys
    }
}

const getParams = (url, route) => {
    const keys = route.keys, obj = Object.assign({}, route)
    route.match && obj.keys && (()=> {
        const params = {}
        let prefix = ''
        for (let key of keys) {
            params[key.key] = url.match(new RegExp(prefix + key.matchStr))[1]
            prefix =  key.prePart + params[key.key]
        }
        obj.params = params
    })()
    return obj
}


//---------------------------
/**
 * 重新构建routes
 */
const reRoutes = routes.map(i=> {
    const reg = getRegExp(i.url)
    reg && (i.url = reg.url) && (i.match = reg.match) && (i.keys = reg.keys)
    return i
})

export const getRoutes = ()=> reRoutes

/**
 * 匹配方法
 * @param url
 * @return {*}
 */
export const match = (url)=> {
    for (let i of reRoutes) { //从全局配置中获取路由列表
        if ((!i.match && i.url === url) || (i.match && i.match.test(url))) {
            return getParams(url, i)
        }
    }
    return false
}
