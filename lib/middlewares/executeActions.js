"use strict";

/**
 * 首屏渲染，服务器端执行redux action 方法，主动更新state
 * 需要服务器端更新state的，在每个route配置增加：
 * renderActions: {//服务器端渲染actions
        actions: [//action 列表
            {
                action: requestPolicy//action 的方法
            },{
                action: requestComp4,//action 的方法
                params: ['param1', 'param1'] //可选，注意参数的先后顺序，restful 中的占位符名称 这里对应这'/comp3/:param1'的feng
            }
        ], dispathCount: 3 //actions 列表中对应的dispath次数
    }
 * @param ctx
 * @param next
 * @return {*}
 */
var executeActions = function () {
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

    return function executeActions(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * store监听代理类，监控store的变更并回掉监听方法
 * @param store
 * @constructor
 */


var _facade = require("./util/facade");

var _facade2 = _interopRequireDefault(_facade);

var _cache2 = require("../common/cache");

var _cache3 = _interopRequireDefault(_cache2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by chkui on 2017/6/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


function StoreProxy(store) {
    var _this = this;
    _this.store = store;
    _this.wrapperListener = false;
    _this.innerListener = function () {
        _this.wrapperListener && _this.wrapperListener(_this.store.getState());
    };
    store.subscribe(_this.innerListener);
}
StoreProxy.prototype.addListener = function (listener) {
    this.wrapperListener = listener;
};
StoreProxy.prototype.dispatch = function (result) {
    this.store.dispatch(result);
};

var process = new function () {
    //EXECUTE ACTIONS
    var _this = this;

    //执行action
    var execute = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(actions, cb) {
            var ctx, route, store, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, action, storeProxy;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            ctx = _this.ctx, route = ctx.route, store = ctx.fluxStore;
                            //轮流调用Actions。
                            //每一个Action必须返回一个promise。处理完毕之后自行回掉
                            //调用Action时会传入当前url，params:匹配的参数{key:value}, storeProxy; redux 的store代理对象，提供監聽和狀態修改回掉

                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context2.prev = 4;
                            _iterator = actions[Symbol.iterator]();

                        case 6:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context2.next = 15;
                                break;
                            }

                            action = _step.value;
                            storeProxy = new StoreProxy(store);
                            _context2.next = 11;
                            return action(route.url, route.params, storeProxy);

                        case 11:
                            console.log('for');

                        case 12:
                            _iteratorNormalCompletion = true;
                            _context2.next = 6;
                            break;

                        case 15:
                            _context2.next = 21;
                            break;

                        case 17:
                            _context2.prev = 17;
                            _context2.t0 = _context2["catch"](4);
                            _didIteratorError = true;
                            _iteratorError = _context2.t0;

                        case 21:
                            _context2.prev = 21;
                            _context2.prev = 22;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 24:
                            _context2.prev = 24;

                            if (!_didIteratorError) {
                                _context2.next = 27;
                                break;
                            }

                            throw _iteratorError;

                        case 27:
                            return _context2.finish(24);

                        case 28:
                            return _context2.finish(21);

                        case 29:
                            ctx.renderActions = true;
                            cb();

                        case 31:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[4, 17, 21, 29], [22,, 24, 28]]);
        }));

        return function execute(_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }();

    var _render = function _render(cb) {
        var route = _this.ctx.route;
        //调用route actions列表 注意cb()
        route.renderActions && route.renderActions.length ? execute(route.renderActions, cb) : cb();
    };

    this.facade = new _facade2.default({
        render: function render(res, rej) {
            _render(res);
        },
        cache: function cache(res, rej) {
            var value = _cache3.default.get(_this.ctx.originalUrl);
            value && value.renderActions ? (_this.ctx.renderActions = value.renderActions, res()) : _render(res);
        }
    });
    this.execute = function (ctx) {
        this.ctx = ctx;
        return this.facade.execute(this.ctx);
    };
}();

module.exports = executeActions;