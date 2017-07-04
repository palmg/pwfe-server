'use strict';

/**
 * 初始化入口页面的工具，必须保证路由配置(routes)符合配置规范
 * @param ctx
 * @param next
 * @return {*}
 */
var component = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var _match;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(ctx.match && ctx.fluxStore)) {
                            _context.next = 11;
                            break;
                        }

                        _match = ctx.match;
                        _context.next = 4;
                        return new Promise(function (resolve, reject) {
                            _match.component(function (Comp) {
                                resolve(Comp);
                            });
                        });

                    case 4:
                        ctx.initComp = _context.sent;

                        ctx.initId = _match.id; //设置当前组件ID
                        ctx.initName = _match.name; //设置主键名称
                        ctx.url = _match.url; //设置匹配url
                        return _context.abrupt('return', next());

                    case 11:
                        return _context.abrupt('return', next());

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function component(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _routes = require('../common/routes');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by chkui on 2017/6/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

module.exports = component;