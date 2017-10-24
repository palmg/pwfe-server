exports.ids = [1];
exports.modules = {

/***/ 348:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(354);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(356);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(357);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(359);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(358);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(93);

var _action = __webpack_require__(94);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comp3 = (0, _reactRedux.connect)(function (state, props) {
    return {
        data: state.reducerDemo,
        policy: state.policy.data
    };
}, function (dispatch, props) {
    return {
        requestComp4: function requestComp4() {
            return dispatch((0, _action.requestTest)());
        }
    };
})(function (_React$Component) {
    (0, _inherits3.default)(_class, _React$Component);

    //渲染榫卯详情页面
    function _class() {
        var _ref;

        (0, _classCallCheck3.default)(this, _class);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        return (0, _possibleConstructorReturn3.default)(this, (_ref = _class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call.apply(_ref, [this].concat(props)));
    }

    (0, _createClass3.default)(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.requestComp4();
        }
    }, {
        key: 'render',
        value: function render() {
            //tenon data
            var _props = this.props,
                data = _props.data,
                policy = _props.policy;

            console.log(policy);

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    'comp3\u751F\u6210\u7684\u9875\u9762\uFF0C\u5F53\u524Dstore\u6570\u636E\uFF1A',
                    policy
                )
            );
        }
    }]);
    return _class;
}(_react2.default.Component));

module.exports = Comp3;

/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(361), __esModule: true };

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(362), __esModule: true };

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(363), __esModule: true };

/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(364), __esModule: true };

/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(353);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(355);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(352);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(160);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(160);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(366);
var $Object = __webpack_require__(6).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(367);
var $Object = __webpack_require__(6).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(368);
module.exports = __webpack_require__(6).Object.getPrototypeOf;


/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(369);
module.exports = __webpack_require__(6).Object.setPrototypeOf;


/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(26);
var anObject = __webpack_require__(12);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(45)(Function.call, __webpack_require__(161).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(15);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(95) });


/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(15);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(18), 'Object', { defineProperty: __webpack_require__(19).f });


/***/ }),

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(58);
var $getPrototypeOf = __webpack_require__(162);

__webpack_require__(163)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(15);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(365).set });


/***/ })

};;