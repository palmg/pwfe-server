/**
 * Created by chkui on 2017/6/21.
 */
// import log from './log'
const log = require('./log')

const init = (opt) => {

    //获取配置对象，初始化默认配置
    const env = require('./env'),
        naming = require('./naming'),
        namingKeys = Object.keys(opt)
    naming.init()
    for (let key of namingKeys) {
        const defValue = naming.getParam(key)
        typeof defValue !== "undefined" && naming.setParam(key, opt[key]) && delete opt[key]
    }

    env.init(naming.getEnv())
    //记录要初始化的中间件
    const middlewareChain = opt.middlewareChain;
    delete opt.middlewareChain

    //设置路由列表
    opt.routes ? setParam(env, 'routes', opt.routes) : (()=> {
        console.error('routes must be setting!')
        process.exit(0)
    })()
    delete opt.routes

    //设置 entry,可能是列表，也可能是string，服务器会以entry的第一个路径作为渲染入口。
    const entry = opt.entry
    entry ? (()=> {
        Array.isArray(entry) ? setParam(env, 'entry', entry) : setParam(env, 'entry', [entry])
        delete opt.entry
    })() : (()=> {
        console.error('entry must be setting!')
        process.exit(0)
    })()

    //设置路由列表
    opt.app ? setParam(env, 'app', opt.app) : (()=> {
        console.error('app must be setting!')
        process.exit(0)
    })()
    delete opt.routes

    opt.isProd && (()=> {
        opt.serverEntry ? setParam(env, 'serverEntry', opt.serverEntry) : (()=> {
            console.error('"serverEntry" must be setting when building Production!')
            process.exit(0)
        })()
        delete opt.serverEntry
    })()

    !opt.middlewareChain && (()=> {
        const chain = [
            ()=>require('../middlewares/reduxStore'),
            ()=>require('../middlewares/executeActions'),
            ()=>require('../middlewares/component'),
            ()=>require('../middlewares/serverApp'),
            ()=>require('../middlewares/htmlView')]
        !opt.isProd && chain.push(()=>require('../middlewares/dataRoute'))
        env.setParam('middlewareChain', chain)
    })()

    const contextKeys = Object.keys(opt)
    for (let key of contextKeys) {
        const defValue = env.getParam(key)
        typeof defValue !== "undefined" && env.setParam(key, opt[key])
    }

    opt.isProd && (()=> {
        log('server Entry:', env.getParam('serverEntry'))
        log('server Module:', env.getParam('serverModule'))
        !env.getParam('serverModule') && log()
    })()

    log("Runtime Context：")
    log(env.getEnv())

    return env
}

const setParam = (env, key, value) => {
    env.setParam(key, value)
}

const envPrint = (naming, env) =>{
    const namingEntries =  Object.entries(naming),
        envEntries = Object.entries(env)
}

module.exports = init
