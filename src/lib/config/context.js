/**
 * Created by chkui on 2017/6/21.
 */

const out = {
    /**
     * 文件打包时生成的文件以及样式全局哈希编码长度
     */
    hashLength: 8,
    /**
     * 输出文件名称文件附加前缀
     * @type {string}
     */
    prefix: '',
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
    nameTag: '[name]',
    /**
     * 打包文件中[id]的标记，当webpack打包时[name]表示当前模块打包之后的webpack生成的对应id。
     * @type {string}
     */
    idTag: '',
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
     * 基础工作路径，全局的路径都会以这个路径为相对路径。
     */
    workDir: __dirname,
    /**
     * webpack的入口资源路径，如果是相对路径，会以 workDir 的相对路径为准
     */
    entry: false,
    /**
     * 入口加载的APP，这里必须设定一个方法，以便以打包后在运行时初始化整个模块，而不是在打包时。
     * 例如：()=>{
     *     return: require('../src/myApp')。
     * }
     * require中的路径是workDir的相对路径
     */
    app: false,
    /**
     * 打包输出路径，如果是相对路径，会以 workDir 的相对路径为准
     */
    outPath: './dist',
    /**
     * 客户端文件打包生成路径，当服务器用于打包执行生产时，需要分别生成客户端的文件和服务端的文件。
     * 这里配置了生成客户端文件的路径。
     * 输出为workDir的相对路径:path.resolve(workDir, outPath, clientPath)
     */
    clientPath: 'client',
    /**
     * 客户端文件打包生成路径，当服务器用于打包执行生产时，需要分别生成客户端的文件和服务端的文件。
     * 这里配置了生成客户端文件的路径。
     * 输出为workDir的相对路径:path.resolve(workDir, outPath, serverPath)
     */
    serverPath: 'server',
    /**
     * html模板路径，会通过HotModuleReplacementPlugin生成新的页面，
     * 输出workDir的相对路径：path.resolve(workDir, htmlTemplatePath)
     * 默认为'./views/index.tpl.html'
     */
    htmlTemplatePath: './views/index.tpl.html',
    /**
     * HtmlWebpackPlugin的生成路径:
     * path.resolve(dir, outPath, viewPath)
     * devServer无效
     */
    viewPath: 'views',
    /**
     * HtmlWebpackPlugin的生成名称。
     * workDir的相对路径:
     * 开发环境会生成到 path.resolve(dir, outPath, htmlFileName)。
     * 生产服务器打包会生成到:path.resolve(dir, outPath, viewPath, htmlFileName)
     * 默认为'index.html'，
     */
    htmlFileName: 'index.html',
    /**
     * 页面共有输出路径，用于html打包时，静态资源等的访问路径
     */
    publicPath: '/',
    //-------------------打包资源配置-------------------------
    /**
     * 外部资源包，例如：
     * ['react','react-dom']
     */
    vendor: ['react', 'react-dom'],
    /**
     * 服务器入口文件配置，当我们需要对生产文件进行打包，需要指向项目中服务入口文件，相对于workDir的路径
     * devServer无效
     */
    serverEntry: false,
    /**
     * 打包输出的入口文件名称
     * devServer无效
     */
    serverEntryName: 'server',
    /**
     * 配置工程的node_modules路径，在打包生产包时可以不讲node_modules中的第三方包打入。
     */
    serverModule: false,
    //-----------------------服务器运行配置-------------------------------------------------------
    /**
     * 服务器运行时的监听端口
     */
    port: 8080,
    /**
     * 静态资源缓存时间，最小为0。静态资源包括js、css。但不包括html。单位是毫秒。
     * devServer无效
     */
    staticMaxAge: 8640000 * 1000,
    /**
     * 静态资源是否执行gzip压缩，如果代理服务器（nginx）开启了gzip压缩，这里可以不必开启。
     * devServer无效
     */
    gzip: true,
    //-------------------react对应的配置-------------------------
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
    //---------------------------------中间件配置----------------------------------------
    /**
     * 中间件处理了连，会在devServer.js或server.js中添加.
     * 设定是中间件的路径，在系统运行时会通过require加载
     * 默认为[reduxStore,component,serverApp,htmlView]。测试环境会额外添加一个dataRoute，用于模拟.json文件进行测试
     * 参数以回调函数的方式提供：
     * [()=>require('../middlewares/reduxStore'),
     * ()=>require('../middlewares/component'),
     * ()=>require('../middlewares/serverApp'),
     * ()=>require('../middlewares/htmlView')]
     */
    middlewareChain: false,
    //---------------------------------文件输出配置---------------------------------------
    fileName: `${out.prefix}${out.idTag}${out.nameTag}[hash:${out.hashLength}${out.suffix}].js`,
    /**
     * 生成的分片文件打包规则。
     */
    chunkFileName: `${out.prefix}${out.idTag}${out.nameTag}[chunkhash:${out.hashLength}].js`,
    /**
     * 样式命名规则。会在webpack配置中以这样的形式输出`clss-loader?${cssLoadRule}`
     */
    cssLoadRule: `modules&camelCase&importLoaders=1&localIdentName=[hash:base64:${out.hashLength}]`,
    /**
     * 抽取出来的CSS文件名称命名规则，
     * devServer无效
     */
    cssFileName: `${out.prefix}${out.idTag}${out.nameTag}[contenthash:${out.hashLength}].css`,
    /**
     * 是否压缩js文件[true|false]
     * devServer无效
     */
    compressJs: false,
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
    /**
     * 标记是否合并分片文件，合并分片文件会把类似的业务代码合并到同一个分片中。
     * devServer无效
     */
    mergingChunk: false,
    //------------------------------定义配置
    /**
     * 用于DefinePlugin的属性配置。是一个对象
     */
    define:{},
    /**
     * 默认网页的Title。可以在routes列表中为每一个页面设置title
     */
    defPageName: 'Palmg'
}

const context = {
    out,
    env
}

module.exports = context