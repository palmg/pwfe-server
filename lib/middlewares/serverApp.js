'use strict';

/**
 * 在服务端创建react渲染入口lo
 * @param ctx
 * @param next
 */
var serverApp = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var context;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        context = {};

                        if (ctx.fluxStore) {
                            //必须要有sotre才能进行渲染
                            ctx.reactDom = (0, _server.renderToString)(_react2.default.createElement(
                                _reactRedux.Provider,
                                { store: ctx.fluxStore },
                                _react2.default.createElement(
                                    _reactRouterDom.StaticRouter,
                                    { location: ctx.url, context: context },
                                    _react2.default.createElement(
                                        App,
                                        { init: { comp: ctx.initComp, id: ctx.initId }, routes: routes },
                                        Children && _react2.default.createElement(Children, null)
                                    )
                                )
                            ));
                        }
                        _context.next = 4;
                        return next();

                    case 4:
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _env = require('../common/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var App = _env2.default.getParam('app')(),
    children = _env2.default.getParam('children'),
    Children = children && children(),
    routes = _env2.default.getParam('routes');

module.exports = serverApp;