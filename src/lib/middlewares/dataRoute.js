/**
 * Created by Administrator on 2017/6/5.
 */
import fs from 'fs'
/**
 * 用于本地开发环境的工具中间件。用于到指定位置读取.json文件，方便模拟接口调试
 * @param ctx
 * @param next
 * @return {Promise}
 */
async function dataRoute(ctx, next) {
    if (!ctx.url.endsWith("hot-update.json") && ctx.url.endsWith(".json")) {
        return new Promise((resolve, reject)=> {
            fs.readFile("." + ctx.url, {encoding: 'utf8'}, (err, data)=> {
                if (err) {
                    console.error("err", err)
                } else {
                    ctx.set('Content-Type', 'application/json');
                    ctx.body = data
                    return resolve()
                }
            })
        })
    } else
        await next();
}
module.exports = dataRoute