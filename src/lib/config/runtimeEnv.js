/**
 * Created by chkui on 2017/6/21.
 */

/**
 *
 * 全局运行环境上下文
 * @type {{port: number, app: ((p1:Object)=>XML), routes: *[], reducer: {}}}
 */
const env = {
    //--------------------工作路径配置------------------------
    /**
     * 基础工作路径，全局的路径都会以这个路径为相对路径
     */
    workDir:__dirname,
    /**
     * html模板路径，会通过HotModuleReplacementPlugin生成新的页面，
     * workDir的相对路径。
     * path.resolve(dir, htmlTemplatePath)
     * 默认为'./views/index.tpl.html'
     */
    htmlTemplatePath:'./views/index.tpl.html',
    /**
     * HotModuleReplacementPlugin的生成路径。
     * workDir的相对路径。
     * path.resolve(dir, htmlFilePath)
     * 默认为'./dist/index.html'，运行后会生成指定文件
     */
    htmlFilePath:'./dist/index.html',
    /**
     * 服务器运行时的渲染模板加载路径
     * workDir的相对路径。
     * 一般是htmlFilePath生成页面的路径。
     * 服务器使用ejs作为渲染模板
     */
    viewsDir:'./dist',

    //-----------------------服务器运行配置
    /**
     * 服务器运行时的监听端口
     */
    port: 8080,
    /**
     * 前端工程的App react component
     */
    app: defApp,
    /**
     * 工程路由配置
     */
    routes: defRoutes,
    /**
     * 用于redux的reducer配置
     * {
     *     key:function(state, action){//DO}
     * }
     */
    reducer: {},
    /**
     * 外部资源包，例如：
     * ['react','react-dom']
     */
    vendor:['react','react-dom'],
    /**
     * webpack的入口资源
     */
    entry:[]
}

/**
 * App是前端工程的入口。
 * 1）App可以用于前后端同构，2端都是要App作为页面入口，
 * 2）自定义的App必须可以传入init参数。init参数用于在服务器和客户端有限初始化页面
 * @param {object} props {
 *   {object} init: 服务器传递的初始化参数。{comp: 初始化组件, id: 初始化页面组件id}
 * }
 * @return {XML}
 * @constructor
 */
const defApp = props =><div>must set an App component</div>

/**
 * 默认routes路由队列，用于react-router执行路由，必须按照下面的结构构建路由配置
 * @type {*[]}
 */
const defRoutes =  [
    {
        id: 'index', //路由的标识id
        module: 'course', //所属模块，*暂无对应的功能
        url: '/*', //路由对应的url
        component: (call)=> {
            //组件加载方法，加载完成后回调call(Component)
            //一般使用webpack的require.ensure分片加载
            call(<div>must config routes</div>)
        }
    }
]

module.exports = env