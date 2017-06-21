"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function dataRoute(ctx, next) {
    if (!ctx.url.endsWith("hot-update.json") && ctx.url.endsWith(".json")) {
        return new Promise(function (resolve, reject) {
            _fs2.default.readFile("." + ctx.url, { encoding: 'utf8' }, function (err, data) {
                if (err) {
                    console.error("err", err);
                } else {
                    ctx.set('Content-Type', 'application/json');
                    ctx.body = data;
                    return resolve();
                }
            });
        });
    } else await next();
} /**
   * Created by Administrator on 2017/6/5.
   */

module.exports = dataRoute;