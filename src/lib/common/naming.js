/**
 * Created by chkui on 2017/6/21.
 */
const nameSpace = require('../config/namingRule')
let __name;

/**
 * 初始化命名规则
 */
const init = ()=>{
    __name = nameSpace.init()
}
/**
 * 获取指定参数
 */
const getParam = key => {
    return __name[key]
}

const setParam = (key, value) => {
    __name[key] = value
    return true
}

const getEnv = ()=> __name

const naming = {init, getParam, setParam, getEnv}
export default naming