/**
 * Created by chkui on 2017/6/22.
 */
const reducerDemo = require('./src/reducer'),
    routes = require('./src/routes'),
    App = require('./src/app'),
    config = {
        serverEntry: './myProServer',
        serverModule: '../node_modules',
        workDir: __dirname,
        reducer: {reducerDemo},
        routes: routes,
        app: App
    }

module.exports = config