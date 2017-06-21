/**
 * Created by chkui on 2017/6/21.
 */
const configEnv = require('../config/runtimeEnv')
const __Env = Object.assign({}, configEnv)

/**
 * 获取指定参数
 */
export const getParam = key => {
    return __Env[key]
}

export const setParam = (key, value) => {
    __Env[key] = value
}

export const getEnv = ()=> __Env

const env = {getParam, setParam, getEnv}
export default env