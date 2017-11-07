"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _facade = require("./util/facade");

var _facade2 = _interopRequireDefault(_facade);

var _cache2 = require("../common/cache");

var _cache3 = _interopRequireDefault(_cache2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by chkui on 2017/6/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var process = new function () {
    //EXECUTE ACTIONS
    var _this = this;

    //执行action
    var execute = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(renderActions, cb) {
            var _this2 = this;

            var ctx, store, actions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

            return regeneratorRuntime.wrap(function _callee2$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            ctx = _this.ctx, store = ctx.fluxStore, actions = renderActions.actions;
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context3.prev = 4;
                            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                                var _ref3, action, params, _ref3$input, input;

                                return regeneratorRuntime.wrap(function _loop$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                _ref3 = _step.value;
                                                action = _ref3.action, params = _ref3.params, _ref3$input = _ref3.input, input = _ref3$input === undefined ? [] : _ref3$input;

                                                params && params.forEach(function (param) {
                                                    //当param = {type:"url",value:"param"}这样的对象时
                                                    if (param && "object" === (typeof param === "undefined" ? "undefined" : _typeof(param))) {
                                                        if (param.type === "url" && param.value) {
                                                            input.push(ctx.route.params[param.value]);
                                                        } else {
                                                            input.push(param.value);
                                                        }
                                                    } else {
                                                        //当param为String时，默认是url中提取参数
                                                        param && "string" === typeof param && input.push(ctx.route.params[param]);
                                                    }
                                                });
                                                _context2.next = 5;
                                                return store.dispatch(action.apply(undefined, _toConsumableArray(input)));

                                            case 5:
                                            case "end":
                                                return _context2.stop();
                                        }
                                    }
                                }, _loop, _this2);
                            });
                            _iterator = actions[Symbol.iterator]();

                        case 7:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context3.next = 12;
                                break;
                            }

                            return _context3.delegateYield(_loop(), "t0", 9);

                        case 9:
                            _iteratorNormalCompletion = true;
                            _context3.next = 7;
                            break;

                        case 12:
                            _context3.next = 18;
                            break;

                        case 14:
                            _context3.prev = 14;
                            _context3.t1 = _context3["catch"](4);
                            _didIteratorError = true;
                            _iteratorError = _context3.t1;

                        case 18:
                            _context3.prev = 18;
                            _context3.prev = 19;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 21:
                            _context3.prev = 21;

                            if (!_didIteratorError) {
                                _context3.next = 24;
                                break;
                            }

                            throw _iteratorError;

                        case 24:
                            return _context3.finish(21);

                        case 25:
                            return _context3.finish(18);

                        case 26:
                            //表示已经执行完毕
                            _this.ctx.dispathCount = 1;
                            cb();

                        case 28:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee2, this, [[4, 14, 18, 26], [19,, 21, 25]]);
        }));

        return function execute(_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }();

    var _render = function _render(cb) {
        var route = _this.ctx.route;
        //调用route actions列表 注意cb()
        route.renderActions && route.renderActions.actions && route.renderActions.actions.length ? execute(route.renderActions, cb) : cb();
    };

    this.facade = new _facade2.default({
        render: function render(res, rej) {
            //execute routes renderActions list
            //listener store modify
            _render(res);
        },
        cache: function cache(res, rej) {
            var value = _cache3.default.get(_this.ctx.originalUrl);
            value && value.dispathCount ? (_this.ctx.dispathCount = value.dispathCount, res()) : _render(res);
        }
    });
    this.execute = function (ctx) {
        this.ctx = ctx;
        return this.facade.execute(this.ctx);
    };
}();

module.exports = executeActions;