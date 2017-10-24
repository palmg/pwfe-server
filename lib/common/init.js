'use strict';

/**
 * Created by chkui on 2017/6/21.
 */
// import log from './log'
var log = require('./log');

var init = function init(opt) {

    //获取配置对象，初始化默认配置
    var env = require('./env'),
        naming = require('./naming'),
        namingKeys = Object.keys(opt);
    naming.init();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = namingKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var defValue = naming.getParam(key);
            typeof defValue !== "undefined" && naming.setParam(key, opt[key]) && delete opt[key];
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

    env.init(naming.getEnv());
    //记录要初始化的中间件
    var middlewareChain = opt.middlewareChain;
    delete opt.middlewareChain;

    //设置路由列表
    opt.routes ? setParam(env, 'routes', opt.routes) : function () {
        console.error('routes must be setting!');
        process.exit(0);
    }();
    delete opt.routes;

    //设置 entry,可能是列表，也可能是string，服务器会以entry的第一个路径作为渲染入口。
    var entry = opt.entry;
    entry ? function () {
        Array.isArray(entry) ? setParam(env, 'entry', entry) : setParam(env, 'entry', [entry]);
        delete opt.entry;
    }() : function () {
        console.error('entry must be setting!');
        process.exit(0);
    }();

    //设置路由列表
    opt.app ? setParam(env, 'app', opt.app) : function () {
        console.error('app must be setting!');
        process.exit(0);
    }();
    delete opt.routes;

    opt.isProd && function () {
        opt.serverEntry ? setParam(env, 'serverEntry', opt.serverEntry) : function () {
            console.error('"serverEntry" must be setting when building Production!');
            process.exit(0);
        }();
        delete opt.serverEntry;
    }();

    !opt.middlewareChain && function () {
        var chain = [function () {
            return require('../middlewares/reduxStore');
        }, function () {
            return require('../middlewares/executeActions');
        }, function () {
            return require('../middlewares/component');
        }, function () {
            return require('../middlewares/serverApp');
        }, function () {
            return require('../middlewares/htmlView');
        }];
        !opt.isProd && chain.push(function () {
            return require('../middlewares/dataRoute');
        });
        env.setParam('middlewareChain', chain);
    }();

    var contextKeys = Object.keys(opt);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = contextKeys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _key = _step2.value;

            var _defValue = env.getParam(_key);
            typeof _defValue !== "undefined" && env.setParam(_key, opt[_key]);
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

    opt.isProd && function () {
        log('server Entry:', env.getParam('serverEntry'));
        log('server Module:', env.getParam('serverModule'));
        !env.getParam('serverModule') && log();
    }();

    log("Runtime Context：");
    log(env.getEnv());

    return env;
};

var setParam = function setParam(env, key, value) {
    env.setParam(key, value);
};

var envPrint = function envPrint(naming, env) {
    var namingEntries = Object.entries(naming),
        envEntries = Object.entries(env);
};

module.exports = init;