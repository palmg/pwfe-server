/**
 * Created by chkui on 2017/6/21.
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
                return require('./src/app')
            },
            define:{
                runMode: "SITE",
                localRun: false,
            }
        });