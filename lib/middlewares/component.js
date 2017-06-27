'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 初始化入口页面的工具，必须保证路由配置(routes)符合配置规范
 * @param ctx
 * @param next
 * @return {*}
 */
var component = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var _this = this;

        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret;

        return regeneratorRuntime.wrap(function _callee$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!ctx.fluxStore) {
                            _context2.next = 31;
                            break;
                        }

                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 4;
                        _loop = regeneratorRuntime.mark(function _loop() {
                            var i;
                            return regeneratorRuntime.wrap(function _loop$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            i = _step.value;

                                            if (!(!i.suffix && i.url === ctx.url || i.suffix && ctx.url.startsWith(i.url))) {
                                                _context.next = 8;
                                                break;
                                            }

                                            _context.next = 4;
                                            return new Promise(function (resolve, reject) {
                                                i.component(function (Comp) {
                                                    resolve(Comp);
                                                });
                                            });

                                        case 4:
                                            ctx.initComp = _context.sent;

                                            ctx.initId = i.id; //设置当前组件ID
                                            ctx.initName = i.name;
                                            return _context.abrupt('return', {
                                                v: next()
                                            });

                                        case 8:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _loop, _this);
                        });
                        _iterator = reRoutes[Symbol.iterator]();

                    case 7:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 15;
                            break;
                        }

                        return _context2.delegateYield(_loop(), 't0', 9);

                    case 9:
                        _ret = _context2.t0;

                        if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
                            _context2.next = 12;
                            break;
                        }

                        return _context2.abrupt('return', _ret.v);

                    case 12:
                        _iteratorNormalCompletion = true;
                        _context2.next = 7;
                        break;

                    case 15:
                        _context2.next = 21;
                        break;

                    case 17:
                        _context2.prev = 17;
                        _context2.t1 = _context2['catch'](4);
                        _didIteratorError = true;
                        _iteratorError = _context2.t1;

                    case 21:
                        _context2.prev = 21;
                        _context2.prev = 22;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 24:
                        _context2.prev = 24;

                        if (!_didIteratorError) {
                            _context2.next = 27;
                            break;
                        }

                        throw _iteratorError;

                    case 27:
                        return _context2.finish(24);

                    case 28:
                        return _context2.finish(21);

                    case 29:
                        _context2.next = 32;
                        break;

                    case 31:
                        return _context2.abrupt('return', next());

                    case 32:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee, this, [[4, 17, 21, 29], [22,, 24, 28]]);
    }));

    return function component(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _env = require('../common/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by chkui on 2017/6/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var routes = _env2.default.getParam("routes");
var reRoutes = routes.map(function (i) {
    var pos = i.url.indexOf(':') - 1;
    i.suffix = 0 < pos;
    i.suffix && (i.url = i.url.substring(0, pos));
    return i;
});

module.exports = component;