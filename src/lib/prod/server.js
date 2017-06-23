import serve from 'koa-static'
import path from 'path'
import views from 'koa-views'
import app from '../app'
import env from '../common/env'
import log from '../common/log'
const dir = eval('__dirname'), //编译时不执行，运行时在共同环境执行。
    port = env.getParam('port'),
    maxAge = env.getParam('staticMaxAge'),
    gzip = env.getParam('gzip'),
    viewsPath = path.resolve(dir, `../${env.getParam('viewPath')}`),
    staticPath = path.resolve(dir, `../${env.getParam('clientPath')}`),
    middlewareChain = env.getParam('middlewareChain')

log('work path:', dir)
log('views path:', viewsPath)
log('static path:', staticPath)
log('static cache age:', maxAge, 'milliseconds')
log(gzip ? 'gzip able' : 'gzip disable')

app.use(views(viewsPath, {map: {html: 'ejs'}}))
app.use(serve(staticPath, {
    maxage: maxAge,
    gzip: gzip
}))

for (let req of middlewareChain) {
    app.use(req())
}

app.listen(port || 8080)
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://[domain]:${port}/ in your browser.\n`)
