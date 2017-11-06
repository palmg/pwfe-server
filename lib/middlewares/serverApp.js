'use strict';

/**
 * 在服务端创建react渲染入口
 * 1)react-route的StaticRouter有个坑，如果URL=/path/:param这种形式传递参数，则内部的route不会渲染
 * @param ctx
 * @param next
 */
var serverApp = function () {
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

    return function serverApp(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * 处理过程实例。由于未使用原型方法禁止初始化多个实例，单例模式。
 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _env = require('../common/env');

var _env2 = _interopRequireDefault(_env);

var _routes = require('../common/routes');

var _facade = require('./util/facade');

var _facade2 = _interopRequireDefault(_facade);

var _cache2 = require('../common/cache');

var _cache3 = _interopRequireDefault(_cache2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var App = _env2.default.getParam('app')(),
    children = _env2.default.getParam('children'),
    Children = children && children(),
    header = _env2.default.getParam('header'),
    Header = header && header(),
    footer = _env2.default.getParam('footer'),
    Footer = footer && footer();
console.log('Children', Children);var process = new function () {
    var _this = this;
    var _render = function _render() {
        var context = {};
        try {
            _this.ctx.reactDom = (0, _server.renderToString)(_react2.default.createElement(
                _reactRedux.Provider,
                { store: _this.ctx.fluxStore },
                _react2.default.createElement(
                    _reactRouterDom.StaticRouter,
                    { location: _this.ctx.url, context: context },
                    _react2.default.createElement(
                        App,
                        { init: { comp: _this.ctx.initComp, id: _this.ctx.initId },
                            routes: (0, _routes.getRoutes)(),
                            header: Header,
                            footer: Footer },
                        Children
                    )
                )
            ));
        } catch (err) {
            console.error("create React dom error:", err);
            _this.ctx.isRender = false;
        }
    };
    this.facade = new _facade2.default({
        render: function render(res, rej) {
            _render();
            res();
        },
        cache: function cache(res, rej) {
            var value = _cache3.default.get(_this.ctx.originalUrl); //获取缓存，缓存结构{html:,store:,component:}
            value && value.html ? _this.ctx.reactDom = value.html : _render();
            res();
        }
    });
    this.execute = function (ctx) {
        this.ctx = ctx;
        return this.facade.execute(this.ctx);
    };
}();

module.exports = serverApp;