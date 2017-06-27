# pwfe-server

pwfe-server是palmg工程中提供前端页面显示和渲染的nodejs服务器。主要以koa实现。

----------
**pwfe：palmg web front server。**

----------

特性：
pwfe-server主要是用于快速构建react组件化、静态化、分片加载的nodejs服务器。

 1. 按照一定规范提供前后端一致的入口，保证前端渲染和后端渲染完全一样的内容。
 1. 实现前后端同步分片。
 1. 解决使用webpack的require.ensure分片加载导致前端重复渲染的问题。
 1. 支持自定义koa中间件开发。
 1. 整合redux。（可以通过修改中间件替换）
 1. 整合react-router。
 1. 整合快速App入口。（可以通过修改中间件替换）
 1. 生产打包文件压缩非常高效。
## 安装
***由于未上传npm，只支持git安装***

 1. 已经按照nodejs环境。
 1. 安装git。
 1. 执行：``npm install git+https://github.com/palmg/pwfe-server.git``
## 使用
***pwfe-server*** 仅仅提供了3个接口：`devServer`、`server`、`builder`。
`devServer`支持热部署和代码动态编译。`server`用于运行在测试或生产服务器上nodejs服务器。`builder`用于对服务器进行打包。

### devServer
```JavaScript
//MyServer
import devServer from 'pwfe-server/devServer'
devServer({
    workDir: __dirname, //当前工作路径
    entry: ['./src/app'], //react的入口组件,等价于webpack的entry
    routes: [], //react-route的路由配置，使用require.enuse
    reducer: {}, //redux的reducer
    app:()=>{require('./src/app')} //设置入口app,
    define:{
        //自定义配置，会影响webpack的DefinePlugin插件。
    }
})
```
设定好之后使用nodejs启动
### server与builder
servre是用于提供服务器的启动入口，而builder是用于对这个入口使用webpack进行打包，两者使用一模一样的配置。
```
//myProServer
import server from 'pwfe-server/server'
server({
    serverEntry: './myProServer', //设定服务器打包入口，就是该文件
    serverModule: '../node_modules',//node_modules的路径，将其排除打包
})
```
指定builder来运行server会在outPut路径下生成对应的生产包和客户端包。
### Demo说明
Demo用于演示如何使用pwfe-server。
运行之前请先执行`npm install`安装所有依赖模块。如果遇到`sass-node`安装异常，请再使用`cnpm install`安装。
***Demo***中用于服务器运行的只有三个文件，`myServer`用于运行开发服务器、`myProServer`用于设置生产服务器、`myBuilder`用于构建生产服务器。
- 使用`npm run demo-dev`运行测试服务器。启动后浏览器中输入localhost:8080可以看到效果。
- 使用`npm run demo-build`使用myBuilder进行生产打包。
- 使用`npm run demo-pro`来运行打包之后的生产服务器。

## API说明
###devServer
用于启动一个用于本地开发的服务器，服务器启动后可以在浏览器上看到效果。
接口 | 说明
---- | ----
options | 用于设定接口参数，参数说明详见options说明
###server
用于启动一个生产服务器。
接口 | 说明
---- | ----
options | 用于设定接口参数，参数说明详见options说明
###builder
用于对生产服务器进行打包。打包后可以直接运行入口文件。
需要打包的原因：
1. 使用webpack打包，便于统一前后端环境。这样可以在统一的webpack环境中统一hash等参数的生成机制以及运行环境。
2. 压缩文件，便于环境复制。
接口|说明
---- | ----
options|用于设定接口参数，参数说明详见options说明
cb|打包成功之后的回调函数
###options
用于配置服务器运行的各种参数。服务器的各种行文都是由options决定的。
接口|说明
----|----
workDir| 基础工作路径，后面设置的各种路径，都会以这个路径为相对路径。
entry|webpack的入口资源路径，以 workDir 的相对路径为准
app|入口加载的APP。这里要设定一个方法以便以打包后在运行时初始化整个模块，而不是在打包时。例如：`()=>{return: require('../src/myApp')}`。require中的路径是当前文件的相对。webpack打包后会替换为_webpack_require_(88)的格式。
children|app的子元素，会用<app><children/></app>的形式传入到app组件中。<br>这里必须设定一个方法，以便以打包后在运行时初始化整个模块，而不是在打包时。例如：<br>`()=>{return:require('../src/myChildren')}`。默认为`fasle`，表示没有子元素。
outPath|打包输出路径，以 workDir 的相对路径为准
clientPath|客户端文件打包生成路径。当打包生产服务时，需要分别生成客户端的文件和服务端的文件。输出的路径为path.resolve(workDir, outPath, clientPath) **仅生产服务有效**
serverPath|服务端文件打包生成路径。当打包生产服务时，需要分别生成客户端的文件和服务端的文件。输出的路径为path.resolve(workDir, outPath, serverPath) **仅生产服务有效**
htmlTemplatePath|html模板路径，会通过HotModuleReplacementPlugin生成新的页面，设置为workDir的相对路径：path.resolve(workDir, htmlTemplatePath)。默认为'./views/index.tpl.html'
viewPath|HtmlWebpackPlugin的生成路径：path.resolve(dir, outPath, viewPath)。
htmlFileName|HtmlWebpackPlugin的生成名称。生成到:path.resolve(dir, outPath, viewPath, htmlFileName)。
publicPath|页面共有输出路径，用于html打包时，静态资源等的访问路径。
vendor|webpack打包的时要独立分片打包的第三方资源包。设定这个值可以有效的将第三方包独立打包用于缓存。结构为一个队列，默认为['react','react-dom']。
serverEntry|服务器入口文件配置，当我们需要对生产文件进行打包，需要指向项目中服务入口文件，相对于workDir的路径。**仅生产服务有效**
serverEntryName|打包输出的入口文件名称。**仅生产服务有效**
serverModule|配置工程的node_modules路径，在打包生产包时可以不将node_modules中的第三方包打入。配置为false表述将第三方包也打入。
port|服务器启动后的监听接口。默认为8080.
staticMaxAge|静态资源缓存时间，最小为0。静态资源包括js、css。但不包括html。单位是毫秒。**仅生产服务有效**
gzip|静态资源是否执行gzip压缩，如果代理服务器（nginx）开启了gzip压缩，这里可以不必开启。**仅生产服务有效**
routes|react-route路由配置。结构为{id: 'index',module: 'course',url: '/comp1',name: 'Demo1页面',component: (call)=> {require.ensure([], require => {call(require('./sub/comp1'))}, 'comp1')}}
reducer|用于redux的reducer配置。结构：`{key:function(state, action){//DO}}`
middlewareChain|定义koa的中间件。改参数是一个列表，通过列表指定一系列的中间件处理方法。 默认为[reduxStore,component,serverApp,htmlView]。测试环境会额外添加一个dataRoute，用于模拟.json文件进行测试。设置案例:[()=>require('../middlewares/reduxStore'),()=>require('../middlewares/component'),()=>require('../middlewares/serverApp'),()=>require('../middlewares/htmlView')]
hashLength|文件打包时生成的文件和样式的希编码长度
prefix|输出文件名称文件附加前缀名称。默认为''
suffix|输出文件名称文件附加后缀名称。默认为''
nameTag|打包文件中[name]的标记，当webpack打包时[name]表示当前文件的名称，用于chunkFileName、chunkFileName，cssFileName。
idTag|打包文件中[id]的标记，当webpack打包时[name]表示当前模块打包之后的webpack生成的对应id。
fileName|打包文件的输出名称。默认为:`${prefix}${idTag}${nameTag}[hash:${hashLength}${suffix}].js`
chunkFileName|生成的分片文件打包规则。默认为:`${prefix}${idTag}${nameTag}[chunkhash:${hashLength}].js`
cssLoadRule|样式命名规则。会在webpack配置中以这样的形式输出`clss-loader?${cssLoadRule}`。默认为：`modules&camelCase&importLoaders=1&localIdentName=[hash:base64:${out.hashLength}]`
cssFileName|抽取出来的CSS文件名称命名规则。默认为：`${out.prefix}${out.idTag}${out.nameTag}[contenthash:${out.hashLength}].css`。**仅生产服务有效**
compressJs|是否压缩js文件[true|false]。**仅生产服务有效**
sourceMap|标记是否打包source map 文件。可选值:<br> **false**：不生成任何调试关联信息。<br>**eval**：使用eval()包裹的字符串代码，在字符串内部包含代码映射信息。<br>**source-map**：最原始source-map模式，针对每一份文件生成对应的'.map'文件，易于调试，缺点就是生成的文件巨大包含所有开发包代码。<br>**hidden-source-map**：和'source-map'几乎一样，就是在文件结尾不包含指向信息。<br>**inline-source-map**：为打包前的每个文件添加sourcemap的dataUrl，追加到打包后文件内容的结尾。<br>**eval-source-map**：将每个模块转化为字符串，使用eval包裹，并将打包前每个模块的sourcemap信息转换为Base64编码，拼接在每个打包后文件的结尾。<br>**cheap-source-map**：同source-map，但不包含列信息，不包含 loader 的 sourcemap。<br>详情可参阅：http://www.cnblogs.com/hhhyaaon/p/5657469.html。
mergingChunk|标记是否合并分片文件，合并分片文件会把类似的业务代码合并到同一个分片中。**仅生产服务有效**
define|用于DefinePlugin的属性配置。是一个对象。例如：`{key1:value1,key2:value2}`。
defPageName|默认网页的Title。可以在routes列表中为每一个页面设置title。默认为'Palmg'。

## 规范
如果使用默认的中间件（middlewares）,需要按照以下规范编写`app`、`routes`、`reducer`。
### routes
中间件`component`、`serverApp`中都会使用到`routes`,我们需要按照以下的方式定义routes:
```JavaScript
[{
    id: 'comp1', //页面id，在列表中唯一
    url: '/', //页面对应的URL
    name: '演示文稿', //页面名称，会渲染到title媒体属性中
    component: (call)=> { //加载组件的回调
        require.ensure([], require => {
            call(require('./sub/comp1'))
        }, 'comp1')
    }
}]
```
***参数说明***：
参数|说明
----|----
id|表示该页面的唯一标识，在内部用于匹配和实现前后端同步渲染。
url|页面对应的url。可以为`/path/name`或`/path/name/:params`的形式
name|页面显示在浏览器title的名称。
component|获取组件的回调方式。一般是(cb)=>{cb(Component)}的方式，无论通过什么方式获取React组件，最后使用cb(component)来返回。例如上面使用了require.ensure规范。
### 前端入口entry
前端入口是指webpack打包的entry文件。在单页面应用中一般就一个入口。
在pwfe-dom工程中提供了通用入口高阶组件entry，请参看[pwfe-dom][1]相关说明。
### 前后端同构工程 App
`App`用于前后端同构渲染。在`pwfe-dom`中已经提供了标准的`App`组件。请参看[pwfe-dom][1]相关说明。
### 分片渲染高阶组件 bundle
`bundle`用于对分片加载的东西进行异步渲染，只要在routes满足回调过程即可，`pwfe-dom`中提供了标准实现，详见[pwfe-dom][1]中的`bundle`部分说明。

  [1]: https://github.com/palmg/pwfe-dom
