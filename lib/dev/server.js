'use strict';

var _env = require('../common/env');

var _env2 = _interopRequireDefault(_env);

var _app = require('../app.js');

var _app2 = _interopRequireDefault(_app);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koaWebpackDevMiddleware = require('koa-webpack-dev-middleware');

var _koaWebpackDevMiddleware2 = _interopRequireDefault(_koaWebpackDevMiddleware);

var _koaWebpackHotMiddleware = require('koa-webpack-hot-middleware');

var _koaWebpackHotMiddleware2 = _interopRequireDefault(_koaWebpackHotMiddleware);

var _koaViews = require('koa-views');

var _koaViews2 = _interopRequireDefault(_koaViews);

var _webpack3 = require('../scripts/webpack.dev');

var _webpack4 = _interopRequireDefault(_webpack3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by chkui on 2017/6/2.
 */
var port = _env2.default.getParam('port'),
    dir = _env2.default.getParam('workDir'),
    middlewareChain = _env2.default.getParam('middlewareChain'),
    compiler = (0, _webpack2.default)(_webpack4.default);
//启动时处理html文件
compiler.plugin('emit', function (compilation, callback) {
    var assets = compilation.assets;
    var file = void 0,
        data = void 0;

    Object.keys(assets).forEach(function (key) {
        if (key.match(/\.html$/)) {
            file = _path2.default.resolve(dir, _env2.default.getParam('outPath'), _env2.default.getParam('htmlFileName'));
            data = assets[key].source();
            _fs2.default.writeFileSync(file, data);
        }
    });
    callback();
});

_app2.default.use((0, _koaViews2.default)(_path2.default.resolve(dir, _env2.default.getParam('outPath')), { map: { html: 'ejs' } })); //处理模板

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = middlewareChain[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var middleware = _step.value;

        _app2.default.use(middleware);
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

_app2.default.use((0, _koaConvert2.default)((0, _koaWebpackDevMiddleware2.default)(compiler, {
    noInfo: true,
    publicPath: _webpack4.default.output.publicPath
}))); //开发中间件
_app2.default.use((0, _koaConvert2.default)((0, _koaWebpackHotMiddleware2.default)(compiler))); //热部署webpack
_app2.default.listen(port); //启动服务
console.log('\n==> \uD83C\uDF0E  Listening on port ' + port + '. Open up http://localhost:' + port + '/ in your browser.\n');