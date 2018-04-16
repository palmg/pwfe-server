"use strict";

/**
 * 模板化替换工具，会根据HTML的内容替换指定内容。 //TODO 目前仅仅支持纯文本替换，还未支持表达式
 * 替换方式：
 * 页面模板：
 * <html>
 *    <head>
 *        //在某些页面不存在，则需要用 if(typeof(myKey) !== 'undefined')的方式来判断。
 *        //不能直接用 if(myKey)的方式，因为nodejs环境运行时myKey不存在的话会直接抛出异常。
 *        <% if (typeof(myKey) !== 'undefined') { %><%- myKey %><% }%>
 *    </head>
 * </html>
 * 返回值：
 * {key:'myValue'}
 * 模板上<%- myKey %>部分会被替换为myValue。
 *
 * route上必须配置template执行方法：
 * routes[{template:(url:当前路由的url, params:当前页面访问参数, state:redux里的数据状态)=>{}}]
 *
 * @param ctx 处理上下文
 * @param next 执行
 * @returns {Promise.<*>}
 */
var template = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return process.execute(ctx);

                    case 2:
                        return _context.abrupt("return", next());

                    case 3:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function template(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _facade = require("./util/facade");

var _facade2 = _interopRequireDefault(_facade);

var _cache2 = require("../common/cache");

var _cache3 = _interopRequireDefault(_cache2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var process = new function () {
    var _this2 = this;

    //EXECUTE ACTIONS
    var _this = this;

    var _render = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(cb) {
            var ctx, route, templateFoo, k_v, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, foo, temp;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            ctx = _this.ctx, route = ctx.route, templateFoo = route.renderTemplate;

                            if (!templateFoo) {
                                _context2.next = 33;
                                break;
                            }

                            k_v = {};
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context2.prev = 6;
                            _iterator = templateFoo[Symbol.iterator]();

                        case 8:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context2.next = 18;
                                break;
                            }

                            foo = _step.value;
                            _context2.next = 12;
                            return foo(route.url, route.params, ctx.fluxStore.getState());

                        case 12:
                            temp = _context2.sent;

                            k_v = Object.assign(k_v, temp);
                            console.log(k_v);

                        case 15:
                            _iteratorNormalCompletion = true;
                            _context2.next = 8;
                            break;

                        case 18:
                            _context2.next = 24;
                            break;

                        case 20:
                            _context2.prev = 20;
                            _context2.t0 = _context2["catch"](6);
                            _didIteratorError = true;
                            _iteratorError = _context2.t0;

                        case 24:
                            _context2.prev = 24;
                            _context2.prev = 25;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 27:
                            _context2.prev = 27;

                            if (!_didIteratorError) {
                                _context2.next = 30;
                                break;
                            }

                            throw _iteratorError;

                        case 30:
                            return _context2.finish(27);

                        case 31:
                            return _context2.finish(24);

                        case 32:
                            ctx.template = k_v;

                        case 33:
                            cb();

                        case 34:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[6, 20, 24, 32], [25,, 27, 31]]);
        }));

        return function _render(_x3) {
            return _ref2.apply(this, arguments);
        };
    }();

    this.facade = new _facade2.default({
        render: function render(res, rej) {
            _render(res);
        },
        cache: function cache(res, rej) {
            var value = _cache3.default.get(_this.ctx.originalUrl);
            //判定缓存中是否已经有SEO信息
            value && value.template ? (_this.ctx.template = value.template, res()) : _render(res);
        }
    });
    this.execute = function (ctx) {
        this.ctx = ctx;
        return this.facade.execute(this.ctx);
    };
}();

module.exports = template;