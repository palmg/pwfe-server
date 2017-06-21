'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _flux = require('pwfe-dom/flux');

var _env = require('../common/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by chkui on 2017/6/6.
 */

var reducer = _env2.default.getParam("reducer");

/**
 * 从全局配置中获取reducer的配置，并根据配置生成store
 * @param ctx
 * @param next
 * @return {*}
 */
async function createStore(ctx, next) {
    if (ctx.fluxStore || ctx.url.endsWith(".json") || ctx.url.endsWith(".js") || ctx.url.endsWith(".map") || ctx.url.endsWith(".html") || ctx.url.endsWith("__webpack_hmr")) {
        return next();
    } else {
        ctx.fluxStore = await new Promise(function (resolve, reject) {
            var store = (0, _flux.buildStore)(reducer);
            resolve(store);
        });
        return next();
    }
}

exports.default = createStore;