exports.ids = [4];
exports.modules = {

/***/ 347:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(93);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by chkui on 2017/6/21.
 */

var Comp2 = (0, _reactRedux.connect)(function (state) {
    return {
        data: state.reducerDemo,
        policy: state.policy
    };
})(function (props) {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'p',
            null,
            'comp2\u751F\u6210\u7684\u9875\u9762\uFF0C\u5F53\u524Dstore\u6570\u636E\uFF1A',
            props.data
        ),
        _react2.default.createElement(
            'p',
            null,
            'policy:',
            props.policy.toString()
        )
    );
});

module.exports = Comp2;

/***/ })

};;