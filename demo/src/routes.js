/**
 * Created by chkui on 2017/5/16.
 */
if (typeof require.ensure !== 'function') { //server without webpack
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

/**
 * 路由列表，在这里配置所有的路由信息。
 * 1）小鹰会前端采用一级目录的方式组织路由列表，防止出现多级目录的相识。
 * 2）可以使用参数匹配的方式配置路由，例如/demo/top/:id 或 /demo/top/:name/:type
 * 3）每一个地址分段用一个英文单词描述，例如：/course/list,不要使用多个词汇
 * 6）参数中，id表示页面标识符号，module表示所属模块，url跳转路径，component配置require.ensure加载过程。
 */
const routes = [
    {
        id: 'comp1', //页面id，在列表中唯一
        url: '/', //页面对应的URL
        name: '演示文稿', //页面名称，会渲染到title媒体属性中
        component: (call)=> { //加载组件的回调
            require.ensure([], require => {
                call(require('./sub/comp1'))
            }, 'comp1')
        }
    }, {
        id: 'index',
        module: 'course',
        url: '/comp1',
        name: 'Demo1页面',
        component: (call)=> {
            require.ensure([], require => {
                call(require('./sub/comp1'))
            }, 'comp1')
        }
    },{
        id: 'comp2',
        module: 'comp2',
        url: '/comp2/:params',
        component: (call)=> {
            require.ensure([], require => {
                call(require('./sub/comp2'))
            }, 'comp2')
        }
    },
]

module.exports = routes