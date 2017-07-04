/**
 * Created by chkui on 2017/6/22.
 */
const reducer = require('./src/reducer'),
    routes = require('./src/routes'),
    action = require('./src/action'),
    //通用配置，用于打包和服务器运行
    config = {
        workDir: __dirname,
        entry: './src/demo',
        app: ()=> {
            return require('pwfe-dom/app') //异步加载app
        },
        appPath: './src/app',
        serverEntry: './myProServer',
        serverModule: '../node_modules',
        reducer: reducer,
        routes: routes,
        define: {
            runMode: "SITE",
            localRun: false,
        }, exeAction: [{
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
    }

module.exports = config