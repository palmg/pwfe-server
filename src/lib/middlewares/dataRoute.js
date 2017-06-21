/**
 * Created by Administrator on 2017/6/5.
 */
import fs from 'fs'
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
export default dataRoute