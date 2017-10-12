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
            call(require('./sub/comp1'))
        }, 'comp1')
    }
}]

module.exports = routes