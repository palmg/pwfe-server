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
 * @param ctx
 * @param next
 * @return {*}
 */
var reduxStore = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var matchUrl;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        matchUrl = (0, _routes.match)(ctx.url);

                        if (!matchUrl) {
                            _context.next = 15;
                            break;
                        }

                        _context.prev = 2;
                        _context.next = 5;
                        return new Promise(function (resolve, reject) {
                            var store = (0, _flux.buildStore)(reducer),
                                exeList = getAction(matchUrl);
                            if (exeList && 0 < exeList.length) {
                                var exeCount = 0,
                                    length = 0;
                                var _iteratorNormalCompletion = true;
                                var _didIteratorError = false;
                                var _iteratorError = undefined;

                                try {
                                    for (var _iterator = exeList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                        var act = _step.value;

                                        length += act.count || _enums.exeAction.defCount;
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

                                store.subscribe(function () {
                                    if (++exeCount === length) {
                                        resolve(store);
                                    }
                                });
                                var _iteratorNormalCompletion2 = true;
                                var _didIteratorError2 = false;
                                var _iteratorError2 = undefined;

                                try {
                                    for (var _iterator2 = exeList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                        var _act = _step2.value;

                                        store.dispatch(_act.action(matchUrl.params));
                                    }
                                } catch (err) {
                                    _didIteratorError2 = true;
                                    _iteratorError2 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                            _iterator2.return();
                                        }
                                    } finally {
                                        if (_didIteratorError2) {
                                            throw _iteratorError2;
                                        }
                                    }
                                }
                            } else {
                                resolve(store);
                            }
                        });

                    case 5:
                        ctx.fluxStore = _context.sent;
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](2);

                        (0, _log2.default)('process fluxStore error', _context.t0);

                    case 11:
                        ctx.match = matchUrl;
                        return _context.abrupt('return', next());

                    case 15:
                        return _context.abrupt('return', next());

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[2, 8]]);
    }));

    return function reduxStore(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * 获取当前路由对应的action
 * @param match
 * @return {boolean}
 */


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

var reducer = _env2.default.getParam("reducer");var getAction = function getAction(match) {
    var id = match.id,
        exeAction = _env2.default.getParam('exeAction');
    var exe = false;
    if (exeAction) {
        exe = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = exeAction[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var act = _step3.value;

                (act.id === exeAction.all || act.id === id) && exe.push(act);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    }
    return exe;
};

module.exports = reduxStore;