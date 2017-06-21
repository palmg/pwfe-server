'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by chkui on 2017/6/21.
 */
var context = require('../config/context');
var __out = Object.assign({}, context.out);

/**
 * 获取指定参数
 */
var getParam = exports.getParam = function getParam(key) {
  return __out[key];
};

var setParam = exports.setParam = function setParam(key, value) {
  __out[key] = value;
};

var getEnv = exports.getEnv = function getEnv() {
  return __out;
};

var out = { getParam: getParam, setParam: setParam, getEnv: getEnv };
exports.default = out;