'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _env = require('../common/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = _env2.default.getParam('app');

/**
 * 进行html模板渲染
 * @param ctx
 * @param next
 */
async function htmlView(ctx, next) {
    if (ctx.reactDom) {
        await ctx.render('index', {
            root: ctx.reactDom, //初始化Html
            state: ctx.fluxStore.getState(), //redux数据
            params: { //服务器参数
                initPath: ctx.url, //初始化访问的URL
                initId: ctx.initId //初始化访问的页面组件id
            }
        });
    } else {
        await next();
    }
}

module.exports = htmlView;