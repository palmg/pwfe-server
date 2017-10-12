import NodeCache from 'node-cache'

/**
 * 缓存接口
 * @param {object} options {
 *    cacheData: 初始化内存数据，array。结构为[{key:,value:,ttl:}]
 *    defaultTtl: 默认数据过期时间，单位秒，默认60×2秒(5分钟)
 * }
 * @constructor
 */
const Cache = function (options = {cacheData: false, defaultTtl: 60 * 5}) {
    !options && (options = {})
    this.__cache = new NodeCache({
        stdTTL:options.defaultTtl
    })
    initCacheData(this.__cache, options.cacheData)
}

/**
 * 获取缓存，如果缓存不存在，会返回一个undefined
 * @param key 缓存对应的key值
 */
Cache.prototype.get = function (key) {
    return this.__cache.get(key)
}

/**
 * 设定缓存，设定成功会返回true
 * @param key 主键
 * @param value 值
 * @param ttl 缓存过期时间
 * @returns true表示设定成功
 */
Cache.prototype.set = function (key, value, ttl) {
    return this.__cache.set(key, value, ttl)
}

/**
 * 初始化缓存数据
 * @param ins
 * @param data
 */
const initCacheData = (ins , data)=>{
    data && Array.isArray(data) && data.forEach((i)=>{
        ins.set(i.key, i.value, i.ttl)
    })
}
const cache = new Cache()
export default cache