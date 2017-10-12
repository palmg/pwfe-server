/**
 * Created by chkui on 2017/5/16.
 */
if (typeof require.ensure !== 'function') { //server without webpack
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const routes = [{
    id: 'indexHtml', //页面id，在列表中唯一
    url: '/index.html', //页面对应的URL
    name: '演示文稿', //页面名称，会渲染到title媒体属性中
    renderRule: 'cache',
    component: (call) => { //加载组件的回调
        require.ensure([], require => {
            call(require('./sub/comp1'))
        }, 'comp1')
    }
}, {
    id: 'index', //页面id，在列表中唯一
    url: '/', //页面对应的URL
    name: '演示文稿', //页面名称，会渲染到title媒体属性中
    renderRule: 'cache',
    component: (call) => { //加载组件的回调
        require.ensure([], require => {
            call(require('./sub/comp1'))
        }, 'comp1')
    }
}, {
    id: 'comp1',
    module: 'course',
    url: '/comp1',
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
    component: (call) => {
        require.ensure([], require => {
            call(require('./sub/comp3'))
        }, 'comp2')
    }
}]

module.exports = routes