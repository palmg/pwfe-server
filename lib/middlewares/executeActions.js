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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by chkui on 2017/6/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var process = new function () {
    //EXECUTE ACTIONS
    var _this = this;

    //执行action
    var execute = function execute(renderActions, cb) {
        var context = _this.ctx;
        //监听state变化
        _this.ctx.fluxStore.subscribe(function () {
            //获取当前router dispath条数
            var count = context.dispathCount ? ++context.dispathCount : context.dispathCount = 1;
            renderActions.dispathCount && count === renderActions.dispathCount && cb();
        });

        var actions = renderActions.actions;

        //遍历每个action执行
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            var _loop = function _loop() {
                var methodObj = _step.value;

                var action = methodObj.action;
                // 获取restfull 对应参数的值，作为参数
                var params = [];
                methodObj.params && methodObj.params.map(function (param) {
                    //当param = {type:"url",value:"param"}这样的对象时
                    if (param && "object" === (typeof param === "undefined" ? "undefined" : _typeof(param))) {
                        if (param.type === "url" && param.value) {
                            params.push(context.route.params[param.value]);
                        } else {
                            params.push(param.value);
                        }
                    } else {
                        //当param为String时，默认是url中提取参数
                        param && "string" === typeof param && params.push(context.route.params[param]);
                    }
                });
                //传参&执行action
                action && "function" === typeof action && action.apply(undefined, params)(_this.ctx.fluxStore.dispatch);
            };

            for (var _iterator = actions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                _loop();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };

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