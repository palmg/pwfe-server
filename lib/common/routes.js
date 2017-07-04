'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.match = exports.getRoutes = undefined;

var _env = require('../common/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _env2.default.getParam("routes");

/**
 * 根据url的参数获取匹配表达式，
 * 1）如果url中不包含/path/:param这种格式的参数，那么返回的false。
 * 2）如果包含，返回{url:/path/PALMSERVER,match:正则匹配表达式,paramPos:参数位置}
 * @param url
 */
/**
 * Created by chkui on 2017/7/3.
 * 用于重构routes的结构。
 * reRoute会重新组织路由列表。
 * 1）解决StaticRouter无法路由url=/path/:param这种格式的参数的问题
 * 2）从url中匹配模块渲染id
 */
var getRegExp = function getRegExp(url) {
    var array = [];
    var ret = void 0;
    getRegPosArray(url, array, 0);
    ret = array.length ? buildRegExp(url, array) : false;
    return ret;
};

var getRegPosArray = function getRegPosArray(url, posArray, start) {
    var pos = url.indexOf(':', start);
    -1 < pos && posArray.push(pos) && getRegPosArray(url, posArray, pos + 1);
};

/**
 * 创建匹配表达式
 * @param url
 * @param posArray
 * @return {{url: string, match: RegExp}}
 */
var buildRegExp = function buildRegExp(url, posArray) {
    var start = 0,
        matchStr = '^',
        exportUrl = '';
    var array = [],
        keys = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = posArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var end = _step.value;

            var str = url.substring(start, end);
            array.push(str);
            start = url.indexOf('/', end);
            -1 === start && (start = url.length);
            keys.push({
                prePart: str,
                key: url.substring(end + 1, start),
                matchStr: str + '(\\w+)'
            });
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

    var count = 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = array[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _str = _step2.value;

            matchStr += _str + '\\w+';
            exportUrl += _str + keys[count++].key;
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

    matchStr += '$';
    return {
        url: exportUrl,
        match: new RegExp(matchStr),
        keys: keys
    };
};

var getParams = function getParams(url, route) {
    var keys = route.keys,
        obj = Object.assign({}, route);
    route.match && obj.keys && function () {
        var params = {};
        var prefix = '';
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var key = _step3.value;

                params[key.key] = url.match(new RegExp(prefix + key.matchStr))[1];
                prefix = key.prePart + params[key.key];
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

        obj.params = params;
    }();
    return obj;
};

//---------------------------
/**
 * 重新构建routes
 */
var reRoutes = routes.map(function (i) {
    var reg = getRegExp(i.url);
    reg && (i.url = reg.url) && (i.match = reg.match) && (i.keys = reg.keys);
    return i;
});

var getRoutes = exports.getRoutes = function getRoutes() {
    return reRoutes;
};

/**
 * 匹配方法
 * @param url
 * @return {*}
 */
var match = exports.match = function match(url) {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = reRoutes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var i = _step4.value;
            //从全局配置中获取路由列表
            if (!i.match && i.url === url || i.match && i.match.test(url)) {
                return getParams(url, i);
            }
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    return false;
};