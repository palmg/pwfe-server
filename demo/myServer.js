/**
 * Created by chkui on 2017/6/21.
 */
/**
 * 执行一个用于开发的服务器。
 * 1）使用node运行。例如 'node ./demo/myServer.js'
 * 2）开发服务器仅用于开发，切勿用测生产环境。
 */
const devServer = require('../devServer'),
    reducer = require('./src/reducer'),
    routes = require('./src/routes'),
    action = require('./src/action'),
    App =
        devServer({
            workDir: __dirname,
            entry: './src/demo',
            appPath: './src/app',
            reducer: reducer,
            routes: routes,
            app: ()=> {
                return require('pwfe-dom/app')
            },
            children: ()=> {
                return require('./src/contain')
            },
            define: {
                runMode: "SITE",
                localRun: false,
            },
            exeAction: [{
                id: 'comp2',
                action: action.action1
            }, {
                id: 'comp2',
                action: action.action2
            }, {
                id: 'comp2',
                action: action.requestPolicy,
                count: 2
            }],
            port: 8080,
            sourceMap: 'source-map'
        });