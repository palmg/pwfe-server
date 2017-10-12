'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 从全局配置中获取reducer的配置，并根据配置生成store
 * 1）定义初始化加载的action：[{id:对应routest的id, action:对应的方法}]
 * 2）在调用对应的action时，会传入url中对应的参数。
 *    例如url格式为'/path/:param1/name/:param2。
 *    此时的url为'/path/1/name/bt'。在调用action时会使用以下格式
 *    action({
 *       param1:'1',
 *       param2:'bt'
 *    })
 * 3）使用路由时一定要指定前缀，
 *    例如路径可以设定为：/path/:param1或/path/:param1/name/:param2或/path/:param1/:param2
 *    但是不能为：/:param1/:param2
 * 4）执行完毕中间件后，ctx中会增加isRender、match、fluxStore三个参数。
 *    isRender {boolean}表示是否需要服务器端渲染，
 *    route {object} 表示当前路由
 *    fluxStore {object} 当前加载完毕的store数据。
 *    如果没有以上任何参数，表示访问的路由并不在路由列表中
 * @param ctx
 * @param next
 * @return {*}
 */
var reduxStore = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
        var split, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        split = ctx.url.split('?'), url = split && 0 < split.length ? split[0] : ctx.url;

                        buildRender(ctx, (0, _routes.match)(url));
                        _context.next = 4;
                        return process.execute(ctx);

                    case 4:
                        return _context.abrupt('return', next());

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function reduxStore(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _flux = require('pwfe-dom/flux');

var _env = require('../common/env');

var _env2 = _interopRequireDefault(_env);

var _routes = require('../common/routes');

var _log = require('../common/log');

var _log2 = _interopRequireDefault(_log);

var _cache2 = require('../common/cache');

var _cache3 = _interopRequireDefault(_cache2);

var _facade = require('./util/facade');

var _facade2 = _interopRequireDefault(_facade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by chkui on 2017/6/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var reducer = _env2.default.getParam("reducer"),
    suffixAlias = _env2.default.getParam('suffixAlias'),
    reg = new RegExp(suffixAlias);

var process = new function () {
    var _this = this;
    var _render = function _render() {
        try {
            _this.ctx.fluxStore = (0, _flux.buildStore)(reducer);
        } catch (err) {
            (0, _log2.default)('process fluxStore error', err);
            _this.ctx.isRender = false;
        }
    };
    this.facade = new _facade2.default({
        render: function render(res, rej) {
            _render();
            res();
        },
        cache: function cache(res, rej) {
            var value = _cache3.default.get(_this.ctx.route.id); //获取缓存，缓存结构{html:,store:,component:}
            value && value.store ? _this.ctx.fluxStore = value.store : _render();
            res();
        }
    });
    this.execute = function (ctx) {
        this.ctx = ctx;
        return this.facade.execute(this.ctx);
    };
}();

/**
 * 构建渲染数据
 * @param ctx
 * @param route
 * @returns {boolean|*}
 */
var buildRender = function buildRender(ctx, route) {
    if (route) {
        ctx.route = route;
        var renderRule = route.renderRule;
        ctx.isMatch = true; //表示匹配上路由列表了
        ctx.isRender = renderRule && true; //标记当前页面是否渲染
        //标记是否执行缓存, 结果是一个对象{ttl:缓存时间}
        ctx.isRender && (ctx.isCache = ('string' === typeof renderRule && 'cache' === renderRule ? {} : false) || ('object' === (typeof renderRule === 'undefined' ? 'undefined' : _typeof(renderRule)) && 'cache' === renderRule.rule ? { ttl: renderRule.ttl } : false));
    } else {
        ctx.isMatch = false;
    }
};

module.exports = reduxStore;