/**
 * Created by chkui on 2017/6/21.
 */
const context = require('../config/context'),
    naming = require('./naming')
let __env

/**
 * 初始化环境变量
 */
const init = ()=>{
    __env = context.init(naming.getEnv())
}
/**
 * 获取指定参数
 */
const getParam = key => {
    return __env[key]
}

const setParam = (key, value) => {
    __env[key] = value
    return true
}

const getEnv = ()=> __env

const env = {init, getParam, setParam, getEnv}
export default env