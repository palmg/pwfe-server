'use strict';

/**
 * 进行html模板渲染的组件。
 * @param ctx
 * @param next
 */
var htmlView = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
        var document, state;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        document = '', state = {};

                        if (!ctx.isMatch) {
                            _context.next = 9;
                            break;
                        }

                        console.log('render', 2);
                        if (ctx.isRender) {
                            console.log('render', 3);
                            document = ctx.reactDom;
                            state = ctx.fluxStore.getState();
                        }
                        console.log('render', 4);
                        _context.next = 7;
                        return ctx.render('index', {
                            title: ctx.initName || _env2.default.getParam('defPageName'),
                            root: document, //初始化Html
                            state: state, //redux数据
                            params: { //服务器参数
                                initPath: ctx.url, //初始化访问的URL
                                initId: ctx.initId //初始化访问的页面组件id
                            }
                        });

                    case 7:
                        _context.next = 11;
                        break;

                    case 9:
                        _context.next = 11;
                        return next();

                    case 11:
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _env = require('../common/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var App = _env2.default.getParam('app');

module.exports = htmlView;