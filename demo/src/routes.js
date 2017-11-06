import {requestPolicy, requestComp4, getSeoInfo} from './action'

/**
 * Created by chkui on 2017/5/16.
 */
if (typeof require.ensure !== 'function') { //server without webpack
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const routes = [{
    id: 'index', //页面id，在列表中唯一
    url: '/', //页面对应的URL
    name: '演示文稿', //页面名称，会渲染到title媒体属性中
    renderRule: 'cache',
    component: (call) => { //加载组件的回调
        require.ensure([], require => {
            call(require('./sub/home'))
        }, 'index')
    }
}, {
    id: 'comp1',
    module: 'course',
    url: '/comp1',
    renderRule: 'cache',
    name: 'Demo1页面',
    component: (call) => {
        require.ensure([], require => {
            call(require('./sub/comp1'))
        }, 'comp1')
    }
}, {
    id: 'comp2',
    module: 'comp2',
    url: '/comp2/:param1/:param2',
    component: (call) => {
        require.ensure([], require => {
            call(require('./sub/comp2'))
        }, 'comp2')
    }
}, {
    id: 'comp3',
    module: 'comp3',
    url: '/comp3/:param1',
    renderRule: 'render',
    renderActions: {//服务器端渲染actions
        actions: [//action 列表
            {
                action: requestPolicy, //action 的方法,
                params: ["param1"] //params子对象都是string时,默认type = "url"
            },{
                action: requestComp4,//action 的方法
                params: [//可选, params列表, value：参数值，type：参数来源的类型(type 两个值: 1. url -> 来源于uri中的占位符 2. default -> 静态值)
                    {value:'param1', type:"url"},//restful 中的占位符名称 这里对应这'/comp3/:param1'的feng
                    {value: "param1", type:"url"},//restful 中的占位符名称 这里对应这'/comp3/:param1'的feng
                    {value:"str", type:"default"}//默认值,即参数的默认值为 "str"
                ] //注意参数的先后顺序, params子对象都是string时,默认type = "url"
            }
        ], dispathCount: 3 //actions 列表中对应的dispath次数
    },
    seo:{//是否需要在组装SEO信息
        method:getSeoInfo,//获取结构化SEO信息回调方法，需要返回promise
        metaField: "meta", //结果集中meta字段
        titleFiled: "title", //结果集中 title字段
        dataStruct: "dataStruct" //google struct结构化数据字段
    },
    component: (call) => {
        require.ensure([], require => {
            call(require('./sub/comp3'))
        }, 'comp3')
    }
}, {
    id: 'comp4',
    module: 'comp4',
    renderRule: 'cache',
    url: '/comp4/:feng',
    renderActions: {//服务器端渲染actions
        actions: [//action 列表
            {
                action: requestComp4,//action 的方法
                params: ['feng',"feng"] //restful 中的占位符名称 这里对应这'/comp4/:feng'的feng
            }
        ], dispathCount: 1 //actions 列表中对应的dispath次数
    },
    component: (call) => {
        require.ensure([], require => {
            call(require('./sub/comp4'))
        }, 'comp4')
    }
}]

module.exports = routes