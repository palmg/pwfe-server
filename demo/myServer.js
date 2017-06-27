/**
 * Created by chkui on 2017/6/21.
 */
/**
 * 执行一个用于开发的服务器。
 * 1）使用node运行。例如 'node ./demo/myServer.js'
 * 2）开发服务器仅用于开发，切勿用测生产环境。
 */
const devServer = require('../devServer'),
    reducerDemo = require('./src/reducer'),
    routes = require('./src/routes'),
    App =
        devServer({
            workDir: __dirname,
            entry: './src/demo',
            appPath: './src/app',
            reducer: {reducerDemo},
            routes: routes,
            app: ()=> {
                return require('pwfe-dom/app')
            },
            children: ()=>{
                return require('./src/contain')
            },
            define: {
                runMode: "SITE",
                localRun: false,
            },
            port: 8080,
            sourceMap: 'source-map'
        });