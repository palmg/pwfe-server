'use strict';

/**
 * 从全局配置中获取reducer的配置，并根据配置生成store
 * @param ctx
 * @param next
 * @return {*}
 */
var createStore = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(ctx.fluxStore || ctx.url.endsWith(".json") || ctx.url.endsWith(".js") || ctx.url.endsWith(".map") || ctx.url.endsWith(".html") || ctx.url.endsWith("__webpack_hmr"))) {
                            _context.next = 4;
                            break;
                        }

                        return _context.abrupt('return', next());

                    case 4:
                        _context.next = 6;
                        return new Promise(function (resolve, reject) {
                            var store = (0, _flux.buildStore)(reducer);
                            resolve(store);
                        });

                    case 6:
                        ctx.fluxStore = _context.sent;
                        return _context.abrupt('return', next());

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function createStore(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _flux = require('pwfe-dom/flux');

var _env = require('../common/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by chkui on 2017/6/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var reducer = _env2.default.getParam("reducer");

module.exports = createStore;