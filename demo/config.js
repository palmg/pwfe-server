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
        appPath: './src/app',
        serverEntry: './myProServer',
        serverModule: '../node_modules',
        reducer: reducer,
        routes: routes,
        compressJs: false,
        app: ()=> require('pwfe-dom/app'),
        header: ()=>require('./src/header'),
        footer: ()=>require('./src/footer'),
        children: ()=>require('./src/contain'),
        static:['./views/testCopy.html'],
        define: {
            __FluxLogLevel:"'Detail'",
            __History:"'Browser'"
        }
    }

module.exports = config