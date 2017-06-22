'use strict';

require('babel-polyfill');

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koaViews = require('koa-views');

var _koaViews2 = _interopRequireDefault(_koaViews);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _env = require('../common/env');

var _env2 = _interopRequireDefault(_env);

var _log = require('../common/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dir = eval('__dirname'),
    //编译时不执行，运行时在共同环境执行。
port = _env2.default.getParam('port'),
    maxAge = _env2.default.getParam('staticMaxAge'),
    gzip = _env2.default.getParam('gzip'),
    viewsPath = _path2.default.resolve(dir, '../' + _env2.default.getParam('clientPath')),
    staticPath = _path2.default.resolve(dir, '../' + _env2.default.getParam('clientPath')),
    middlewareChain = _env2.default.getParam('middlewareChain');

(0, _log2.default)('work path:', dir);
(0, _log2.default)('views path:', viewsPath);
(0, _log2.default)('static path:', staticPath);
(0, _log2.default)('static cache age:', maxAge, 'milliseconds');
(0, _log2.default)(gzip ? 'gzip able' : 'gzip disable');

_app2.default.use((0, _koaViews2.default)(viewsPath, { map: { html: 'ejs' } }));
_app2.default.use((0, _koaStatic2.default)(staticPath, {
    maxage: maxAge,
    gzip: gzip
}));

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

_app2.default.listen(port || 8080);
console.log('\n==> \uD83C\uDF0E  Listening on port ' + port + '. Open up http://[domain]:' + port + '/ in your browser.\n');