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
    renderActions: [//action 列表
        (url, params, store) => {
            return new Promise((res, rej) => {
                store.addListener((state) => {
                    if ('loading1' !== state.policy.data) {res();}
                })
                store.dispatch(requestPolicy())
            })
        }
    ],
    renderTemplate: [
        (url, params, state) =>
            new Promise((res, rej) => {
                res({description:'<meta name="description" content="SEO DESCRIPTION"/>'})
            }),
        (url, params, state) =>
            new Promise((res, rej) => {
                res({keywords:'<meta name="keywords" content="SEO KEYWORDS">'})
            }),
        (url, params, state) =>
            new Promise((res, rej) => {
                res({listSamples:[1,2,3,4,5,6,7,8,9]})
            }),
        (url, params, state) =>
            new Promise((res, rej) => {
                res({title:'ModifyTitle'})
            })
    ],
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
                params: ['feng', "feng"] //restful 中的占位符名称 这里对应这'/comp4/:feng'的feng
            }
        ], dispathCount: 1 //actions 列表中对应的dispath次数
    },
    component: (call) => {
        require.ensure([], require => {
            call(require('./sub/comp4'))
        }, 'comp4')
    }
}, {
    id: 'error',
    module: 'course',
    name: 'error页面',
    component: (call) => {
        require.ensure([], require => {
            call(require('./sub/comp1'))
        }, 'comp1')
    }
}]

module.exports = routes