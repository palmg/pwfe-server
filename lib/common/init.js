'use strict';

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init(opt) {

    //获取配置对象，初始化默认配置
    var env = require('./env'),
        out = require('./out');

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

    opt.isProd && function () {
        opt.serverEntry ? setParam(env, 'serverEntry', opt.serverEntry) : function () {
            console.error('"serverEntry" must be setting when building Production!');
            process.exit(0);
        }();
        delete opt.app;
    }();

    for (var key in opt) {
        typeof env.getParam(key) !== "undefined" ? env.setParam(key, opt[key]) : out.getParam(key) && out.setParam(key, opt[key]);
    }

    //初始化中间件，中间件必须放在最后加载，否则某些参数无法初始化
    opt.middlewareChain ? env.setParam('middlewareChain', opt.middlewareChain) : function () {
        var chain = [require('../middlewares/reduxStore'), require('../middlewares/component'), require('../middlewares/serverApp'), require('../middlewares/htmlView')];
        !opt.isProd && chain.push(require('../middlewares/dataRoute'));
        env.setParam('middlewareChain', chain);
    }();

    (0, _log2.default)('workDir:', env.getParam('workDir'));
    (0, _log2.default)('reducer:', env.getParam('reducer'));
    (0, _log2.default)('client Entry', env.getParam('entry'));
    opt.isProd && function () {
        (0, _log2.default)('server Entry:', env.getParam('serverEntry'));
        (0, _log2.default)('server Module:', env.getParam('serverModule'));
        !env.getParam('serverModule') && (0, _log2.default)();
    }();

    return env;
}; /**
    * Created by chkui on 2017/6/21.
    */


var setParam = function setParam(env, key, value) {
    env.setParam(key, value);
};

module.exports = init;