import RenderFacade from "./util/facade";
import cache from "../common/cache";
/**
 * 获取SEO信息
 * @param ctx
 * @param next
 * @return {*}
 */
async function getSeoInfo(ctx, next) {
    await process.execute(ctx)
    return next();
}

const process = new function () {//EXECUTE ACTIONS
    const _this = this

    const render = async (cb) => {
        const route = _this.ctx.route
        const seo = route.seo
        //get seo
        if (seo && seo.method && "function" === typeof seo.method) {
            //回调获取SEO信息方法,传入uri
            let seoResult = await seo.method(_this.ctx.originalUrl)
            let seoData = {}
            //SEO 结构化数据
            seoResult && seo.dataStruct && ( seoData.dataStruct = seoResult[seo.dataStruct])
            seoResult && seo.metaField && ( seoData.metaField = seoResult[seo.metaField])
            seoResult && seo.titleFiled && ( seoData.titleFiled = seoResult[seo.titleFiled])
            seoData && (_this.ctx.seo = seoData)
            cb()
        }else {
            cd()
        }
    }

    this.facade = new RenderFacade(
        {
            render: (res, rej) => {
                //execute routes renderActions list
                //listener store modify
                render(res)
            },
            cache: (res, rej) => {
                const value = cache.get(_this.ctx.originalUrl)
                //判定缓存中是否已经有SEO信息
                value && value.seo ? (_this.ctx.seo = value.seo, res()) : render(res)
            }
        }
    )
    this.execute = function (ctx) {
        this.ctx = ctx
        return this.facade.execute(this.ctx)
    }
}

module.exports = getSeoInfo
