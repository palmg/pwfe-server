'use strict';

/**
 * 初始化入口页面的工具，必须保证路由配置(routes)符合配置规范
 * @param ctx
 * @param next
 * @return {*}
 */
var component = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return process.execute(ctx);

                    case 2:
                        return _context.abrupt('return', next());

                    case 3:
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

var _facade = require('./util/facade');

var _facade2 = _interopRequireDefault(_facade);

var _cache2 = require('../common/cache');

var _cache3 = _interopRequireDefault(_cache2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by chkui on 2017/6/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var process = new function () {
    var _this = this;
    var _render = function _render(cb) {
        var route = _this.ctx.route;
        route.component(function (Comp) {
            _this.ctx.initComp = Comp;
            _this.ctx.initId = route.id; //设置当前组件ID
            _this.ctx.initName = route.name; //设置主键名称
            _this.ctx.url = route.url; //设置匹配url
            cb();
        });
    };
    this.facade = new _facade2.default({
        render: function render(res, rej) {
            _render(res);
        },
        cache: function cache(res, rej) {
            var value = _cache3.default.get(_this.ctx.originalUrl); //获取缓存，缓存结构{html:,store:,component}
            if (value && value.component) {
                _this.ctx.initComp = value.component.comp;
                _this.ctx.initId = value.component.id;
                res();
            } else {
                _render(res);
            }
        }
    });
    this.execute = function (ctx) {
        this.ctx = ctx;
        return this.facade.execute(this.ctx);
    };
}();

module.exports = component;