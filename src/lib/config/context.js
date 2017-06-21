/**
 * Created by chkui on 2017/6/21.
 */

const out = {
    /**
     * 文件打包时生成的文件以及样式全局哈希编码长度
     */
    hashLength:8,
    /**
     * 输出文件名称文件附加前缀
     * @type {string}
     */
    prefix : '',
    /**
     * 输出文件名称文件附加后缀
     * @type {string}
     */
    suffix: '',
    /**
     * 打包文件中[name]的标记，当webpack打包时[name]表示当前文件的名称
     * 用于chunkFileName、chunkFileName，cssFileName
     * @type {string}
     */
    nameTag : '[name]',
    /**
     * 打包文件中[id]的标记，当webpack打包时[name]表示当前模块打包之后的webpack生成的对应id。
     * @type {string}
     */
    idTag : '',
    /**
     * 主文件的打包规则，vendor，manifest都是在这里定义
     */
}

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
     * 静态资源缓存时间，最小为0。静态资源包括js、css。但不包括html。单位是毫秒
     */
    staticMaxAge: 8640000 * 1000,
    /**
     * 静态资源是否执行gzip压缩，如果代理服务器（nginx）开启了gzip压缩，这里可以不必开启。
     */
    gzip: true,
    /**
     * 服务器运行模式 ['DEV'|'SITE']，测试环境用'DEV'，生产和仿真环境用'SITE'
     */
    runMode:"DEV",
    /**
     * 标记是否在本地执行 [true|false]，在任何服务器上运行都设置为false
     */
    localRun:false,
    //-------------------react对应的配置-------------------------
    /**
     * 前端工程的App react component
     */
    app: false,
    /**
     * 工程路由配置
     */
    routes: false,
    /**
     * 用于redux的reducer配置
     * {
     *     key:function(state, action){//DO}
     * }
     */
    reducer: {},
    //-------------------打包资源配置-------------------------
    /**
     * 外部资源包，例如：
     * ['react','react-dom']
     */
    vendor:['react','react-dom'],
    /**
     * webpack的入口资源路径，如果是相对路径，会以 workDir 的相对路径为准
     */
    entry:['./src/demo'],
    /**
     * 打包输出路径，如果是相对路径，会以 workDir 的相对路径为准
     */
    outPath:'./dist',
    /**
     * 页面共有输出路径，用于html打包时，静态资源等的访问路径
     */
    publicPath:'/',
    //---------------------------------中间件配置----------------------------------------
    /**
     * 中间件处理了连，会在devServer.js或server.js中添加
     * 默认为[reduxStore,component,serverApp,htmlView]。测试环境会额外添加一个dataRoute，用于模拟.json文件进行测试
     */
    middlewareChain:[],
    //---------------------------------文件输出配置---------------------------------------
    fileName: `${out.prefix}${out.idTag}${out.nameTag}[hash:${out.hashLength}${out.suffix}].js`,
    /**
     * 生成的分片文件打包规则。
     */
    chunkFileName: `${out.prefix}${out.idTag}${out.nameTag}[chunkhash:${out.hashLength}].js`,
    /**
     * 样式命名规则
     */
    cssLoadRule: `modules&camelCase&importLoaders=1&localIdentName=[hash:base64:${out.hashLength}]`,
    /**
     * 抽取出来的CSS文件名称命名规则
     */
    cssFileName: `${out.prefix}${out.idTag}${out.nameTag}[contenthash:${out.hashLength}].css`,
    /**
     * 是否压缩js文件[true|false]
     * devServer无效
     */
    compressJs: true,
    /**
     * 标记是否打包source map 文件
     * 可选值:[
     *     false|boolean类型，不生成任何调试关联信息
     *     'eval'| 使用eval包裹的字符串代码，在字符串内部包含代码映射信息
     *     'source-map'| 最原始source-map模式，针对每一份文件生成对应的'.map'文件，易于调试，缺点就是生成的文件巨大包含所有开发包代码
     *     'hidden-source-map'| 和'source-map'几乎一样，就是在文件结尾不包含指向信息
     *     'inline-source-map'| 为打包前的每个文件添加sourcemap的dataUrl，追加到打包后文件内容的结尾
     *     'eval-source-map'| 将每个模块转化为字符串，使用eval包裹，并将打包前每个模块的sourcemap信息转换为Base64编码，拼接在每个打包后文件的结尾
     *     'cheap-source-map'| 同source-map,但不包含列信息，不包含 loader 的 sourcemap
     *     'cheap-module-source-map'
     *     ]
     *  参考阅读：http://www.cnblogs.com/hhhyaaon/p/5657469.html。
     *
     *  **生产配置使用 false，开发环境或测试环境使用'source-map'即可
     */
    sourceMap: false,
}

const context = {
    out,
    env
}

module.exports = context