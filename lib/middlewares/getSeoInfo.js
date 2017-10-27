"use strict";

/**
 * 获取SEO信息
 * @param ctx
 * @param next
 * @return {*}
 */
var getSeoInfo = function () {
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

    return function getSeoInfo(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _facade = require("./util/facade");

var _facade2 = _interopRequireDefault(_facade);

var _cache2 = require("../common/cache");

var _cache3 = _interopRequireDefault(_cache2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var process = new function () {
    var _this2 = this;

    //EXECUTE ACTIONS
    var _this = this;

    var _render = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(cb) {
            var route, seo, seoResult, seoData;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            route = _this.ctx.route;
                            seo = route.seo;
                            //get seo

                            if (!(seo && seo.method && "function" === typeof seo.method)) {
                                _context2.next = 14;
                                break;
                            }

                            _context2.next = 5;
                            return seo.method(_this.ctx.originalUrl);

                        case 5:
                            seoResult = _context2.sent;
                            seoData = {};
                            //SEO 结构化数据

                            seoResult && seo.dataStruct && (seoData.dataStruct = seoResult[seo.dataStruct]);
                            seoResult && seo.metaField && (seoData.metaField = seoResult[seo.metaField]);
                            seoResult && seo.titleFiled && (seoData.titleFiled = seoResult[seo.titleFiled]);
                            seoData && (_this.ctx.seo = seoData);
                            cb();
                            _context2.next = 15;
                            break;

                        case 14:
                            cd();

                        case 15:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));

        return function _render(_x3) {
            return _ref2.apply(this, arguments);
        };
    }();

    this.facade = new _facade2.default({
        render: function render(res, rej) {
            //execute routes renderActions list
            //listener store modify
            _render(res);
        },
        cache: function cache(res, rej) {
            var value = _cache3.default.get(_this.ctx.originalUrl);
            //判定缓存中是否已经有SEO信息
            value && value.seo ? (_this.ctx.seo = value.seo, res()) : _render(res);
        }
    });
    this.execute = function (ctx) {
        this.ctx = ctx;
        return this.facade.execute(this.ctx);
    };
}();

module.exports = getSeoInfo;