"use strict";

/**
 * 用于本地开发环境的工具中间件。用于到指定位置读取.json文件，方便模拟接口调试
 * @param ctx
 * @param next
 * @return {Promise}
 */
var dataRoute = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(!ctx.url.endsWith("hot-update.json") && ctx.url.endsWith(".json"))) {
                            _context.next = 4;
                            break;
                        }

                        return _context.abrupt("return", new Promise(function (resolve, reject) {
                            _fs2.default.readFile("." + ctx.url, { encoding: 'utf8' }, function (err, data) {
                                if (err) {
                                    console.error("err", err);
                                } else {
                                    ctx.set('Content-Type', 'application/json');
                                    ctx.body = data;
                                    return resolve();
                                }
                            });
                        }));

                    case 4:
                        _context.next = 6;
                        return next();

                    case 6:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function dataRoute(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Administrator on 2017/6/5.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


module.exports = dataRoute;