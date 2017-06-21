/**
 * Created by chkui on 2017/6/2.
 */
import env from '../common/env'
import app from './app.js'
import convert from 'koa-convert'
import webpack from 'webpack'
import fs from 'fs'
import path from 'path'
import devMiddleware from 'koa-webpack-dev-middleware'
import hotMiddleware from 'koa-webpack-hot-middleware'
import views from 'koa-views'
import config from '../scripts/webpack.server'

const port = env.getParam('port'),compiler = webpack(config),dir = env.getParam('workDir');
//启动时处理html文件
compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets
    let file, data

    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, key)
            data = assets[key].source()
            fs.writeFileSync(file, data)
        }
    })
    callback()
})
app.use(views(path.resolve(dir, env.getParam('viewsDir')), {map: {html: 'ejs'}})) //处理模板
//app.use(createStore) //异步处理store
//app.use(clientRoute)
//app.use(dataRoute)
app.use(convert(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))) //开发中间件
app.use(convert(hotMiddleware(compiler))) //热部署webpack
app.listen(port) //启动服务
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)