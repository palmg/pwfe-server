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
        id: 'comp1',
        module: 'comp1',
        url: '/',
        component: (call)=> {
            require.ensure([], require => {
                call(require('./sub/comp1'))
            }, 'comp1')
        }
    }, {
        id: 'index',
        module: 'course',
        url: '/comp1',
        component: (call)=> {
            require.ensure([], require => {
                call(require('./sub/comp1'))
            }, 'comp1')
        }
    },{
        id: 'comp2',
        module: 'comp2',
        url: '/comp2',
        component: (call)=> {
            require.ensure([], require => {
                call(require('./sub/comp2'))
            }, 'comp2')
        }
    },
]

module.exports = routes