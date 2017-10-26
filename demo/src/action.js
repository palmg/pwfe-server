/**
 * Created by chkui on 2017/6/30.
 */

const get = require('pwfe-dom/net').get
var fetch = require('node-fetch')

// if you are on node v0.10, set a Promise library first, eg.
// fetch.Promise = require('bluebird');


const action1 = () => {
    return {
        type: '1',
        data: 'Action Date1'
    }
}
const action2 = (param) => {
    return {
        type: '2',
        data: `Action Date2.Current Params: ${param.param1},${param.param2}`
    }
}
/**
 * 服务器端执行redux action测试
 *
 * @returns {function(*)}
 */
const requestPolicy = () => {
    return (dispath) => {
        dispath(getPolicy())
        get('http://fordevtest.mlhang.com/recommend/target/user/5/op/recommend/0').suc((res) => {
            dispath(setPolicy(JSON.stringify(res)))
        })
    }
}

const requestTest = () => {
    return (dispath) => {
        dispath(getPolicy())
        return get('http://fordevtest.mlhang.com/recommend/target/user/5/op/recommend/0').suc((res) => {
            dispath(setPolicy(JSON.stringify(res)))
        })
    }
}

//测试url中提取的参数
const requestComp4 = (type, type2) => (dispath) => {
    console.log(type2)
    dispath(setComp4(type))
}


const getPolicy = () => {
    return {
        type: 'policy',
        data: 'loading1'
    }
}

const setPolicy = (policy) => {
    return {
        type: 'policy',
        data: policy.toString()
    }
}

const setComp4 = (policy) => {
    return {
        type: 'comp4',
        comp4: policy
    }
}

/**
 * 获取组装好的SEO信息(使用的是node-fetch, 需要promise保证同步)
 * @param relativeUri 传入相对路径，这个参数固定
 * @returns {Promise.<TResult>|Request|*} 返回：{
 *	dataStruct:object,//google struct结构化Json
 *	meta: string, //meta 组装好的<meta ... />
 *	title: string, // seo 标题title
 *  }
 */
const getSeoInfo = (relativeUri) => {
    let seoResult = {}
    console.log("relative uri :" + relativeUri)
    let getSeoApi = "http://localhost:12001/user/seoInfo?param=" + JSON.stringify({"resurl": relativeUri})
    //get seo from remote api
    return fetch(getSeoApi)
        .then((res) => res.json())
        .then((res) => {
            console.log(JSON.stringify(res))
            let seoJson = res && res.code && res.code === '0' && res.data ? res.data : {}

            //extract seo data
            seoJson && seoJson.seo_data_struct && (seoResult.dataStruct = seoJson.seo_data_struct)
            seoJson && seoJson.seo_meta && (seoResult.meta = seoJson.seo_meta)
            seoJson && seoJson.seo_title && (seoResult.title = seoJson.seo_title)
            return seoResult
        })
}

const action = {
    action1,
    action2,
    requestPolicy,
    requestTest,
    requestComp4,
    getSeoInfo
}

module.exports = action