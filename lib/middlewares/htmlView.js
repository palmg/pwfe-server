'use strict';

/**
 * 进行html模板渲染的组件。
 * @param ctx
 * @param next
 */
var htmlView = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!ctx.isMatch) {
                            _context.next = 7;
                            break;
                        }

                        //获取React静态文本和redux状态数据
                        data = getData(ctx);

                        writeCache(ctx); //写缓存
                        _context.next = 5;
                        return ctx.render('index', {
                            title: ctx.initName || _env2.default.getParam('defPageName'),
                            root: data.document, //初始化Html
                            state: data.state, //redux数据
                            params: { //服务器参数
                                initPath: ctx.url, //初始化访问的URL
                                initId: ctx.initId //初始化访问的页面组件id
                            }
                        });

                    case 5:
                        _context.next = 8;
                        break;

                    case 7:
                        return _context.abrupt('return', next());

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function htmlView(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * 从上下文获取数据
 * @param {object} ctx koa单次请求的上下文(request context)
 * @returns {object} {document:React渲染的HTML文本, state:store中的状态数据}
 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _facade = require('./util/facade');

var _facade2 = _interopRequireDefault(_facade);

var _cache = require('../common/cache');

var _cache2 = _interopRequireDefault(_cache);

var _env = require('../common/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var App = _env2.default.getParam('app');var getData = function getData(ctx) {
    return ctx.isRender ? { document: ctx.reactDom, state: ctx.fluxStore.getState() } : { document: '', state: {} };
};

/**
 * 写缓存
 * @param ctx
 */
var writeCache = function writeCache(ctx) {
    if (ctx.isCache) {
        var key = ctx.originalUrl;
        //写缓存，缓存结构{html:,store:,component:}
        _cache2.default.get(key) || _cache2.default.set(key, {
            html: ctx.reactDom,
            store: ctx.fluxStore,
            component: ctx.initComp,
            dispathCount: ctx.dispathCount
        }, ctx.isCache.ttl);
    }
};

module.exports = htmlView;