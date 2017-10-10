'use strict';

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
        var split, url, route;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        split = ctx.url.split('?'), url = split && 0 < split.length ? split[0] : ctx.url, route = (0, _routes.match)(url);

                        if (!(route && isRender(ctx, route))) {
                            _context.next = 16;
                            break;
                        }

                        _context.prev = 2;
                        _context.next = 5;
                        return new Promise(function (resolve, reject) {
                            var store = (0, _flux.buildStore)(reducer); //TODO 还未加入action执行方法
                            resolve(store);
                        });

                    case 5:
                        ctx.fluxStore = _context.sent;

                        ctx.route = route;
                        _context.next = 13;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](2);

                        (0, _log2.default)('process fluxStore error', _context.t0);
                        ctx.isRender = false;

                    case 13:
                        return _context.abrupt('return', next());

                    case 16:
                        return _context.abrupt('return', next());

                    case 17:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[2, 9]]);
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

var _enums = require('../config/enums');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by chkui on 2017/6/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var reducer = _env2.default.getParam("reducer"),
    suffixAlias = _env2.default.getParam('suffixAlias'),
    renderRule = _enums.renderRuleEnum[_env2.default.getParam('renderRule')],
    reg = new RegExp(suffixAlias);

var isRender = function isRender(ctx, route) {
    ctx.isMatch = true;
    ctx.isRender = renderRule === _enums.renderRuleEnum.blacklisting && !route.renderRule || renderRule === _enums.renderRuleEnum.whitelisting && route.renderRule;
    return ctx.isRender;
};

module.exports = reduxStore;