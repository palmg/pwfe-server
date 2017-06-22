/**
 * Created by chkui on 2017/6/21.
 */
const devServer = require('../devServer'),
    reducerDemo = require('./src/reducer'),
    routes = require('./src/routes'),
    App = require('./src/app')
devServer({
    workDir: __dirname,
    reducer: {reducerDemo},
    routes: routes,
    app:App
});