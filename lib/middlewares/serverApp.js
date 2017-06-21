'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _env = require('../common/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = _env2.default.getParam('app'),
    routes = _env2.default.getParam('routes');

/**
 * 在服务端创建react渲染入口
 * @param ctx
 * @param next
 */
async function serverApp(ctx, next) {
    var context = {};
    if (ctx.fluxStore) {
        //必须要有sotre才能进行渲染
        ctx.reactDom = (0, _server.renderToString)(_react2.default.createElement(
            _reactRedux.Provider,
            { store: ctx.fluxStore },
            _react2.default.createElement(
                _reactRouterDom.StaticRouter,
                { location: ctx.url, context: context },
                _react2.default.createElement(App, { init: { comp: ctx.initComp, id: ctx.initId }, routes: routes })
            )
        ));
    }
    await next();
}

exports.default = serverApp;