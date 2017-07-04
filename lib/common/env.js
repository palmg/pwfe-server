'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by chkui on 2017/6/21.
 */
var context = require('../config/context'),
    naming = require('./naming');
var __env = void 0;

/**
 * 初始化环境变量
 */
var init = function init() {
    __env = context.init(naming.getEnv());
};
/**
 * 获取指定参数
 */
var getParam = function getParam(key) {
    return __env[key];
};

var setParam = function setParam(key, value) {
    __env[key] = value;
    return true;
};

var getEnv = function getEnv() {
    return __env;
};

var env = { init: init, getParam: getParam, setParam: setParam, getEnv: getEnv };
exports.default = env;