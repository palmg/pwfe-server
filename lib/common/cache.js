'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeCache = require('node-cache');

var _nodeCache2 = _interopRequireDefault(_nodeCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 缓存接口
 * @param {object} options {
 *    cacheData: 初始化内存数据，array。结构为[{key:,value:,ttl:}]
 *    defaultTtl: 默认数据过期时间，单位秒，默认60×2秒(5分钟)
 * }
 * @constructor
 */
var Cache = function Cache() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { cacheData: false, defaultTtl: 60 * 5 };

    !options && (options = {});
    this.__cache = new _nodeCache2.default({
        stdTTL: options.defaultTtl
    });
    initCacheData(this.__cache, options.cacheData);
};

/**
 * 获取缓存，如果缓存不存在，会返回一个undefined
 * @param key 缓存对应的key值
 */
Cache.prototype.get = function (key) {
    return this.__cache.get(key);
};

/**
 * 设定缓存，设定成功会返回true
 * @param key 主键
 * @param value 值
 * @param ttl 缓存过期时间
 * @returns true表示设定成功
 */
Cache.prototype.set = function (key, value, ttl) {
    return this.__cache.set(key, value, ttl);
};

/**
 * 初始化缓存数据
 * @param ins
 * @param data
 */
var initCacheData = function initCacheData(ins, data) {
    data && Array.isArray(data) && data.forEach(function (i) {
        ins.set(i.key, i.value, i.ttl);
    });
};
var cache = new Cache();
exports.default = cache;