/**
 * Created by chkui on 2017/6/21.
 */
const context = require('../config/context')
const __out = Object.assign({}, context.out)

/**
 * 获取指定参数
 */
export const getParam = key => {
    return __out[key]
}

export const setParam = (key, value) => {
    __out[key] = value
}

export const getEnv = ()=> __out

const out = {getParam, setParam, getEnv}
export default out