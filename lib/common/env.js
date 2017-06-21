'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by chkui on 2017/6/21.
 */
var context = require('../config/context');
var __Env = Object.assign({}, context.env);

/**
 * 获取指定参数
 */
var getParam = exports.getParam = function getParam(key) {
  return __Env[key];
};

var setParam = exports.setParam = function setParam(key, value) {
  __Env[key] = value;
};

var getEnv = exports.getEnv = function getEnv() {
  return __Env;
};

var env = { getParam: getParam, setParam: setParam, getEnv: getEnv };
exports.default = env;