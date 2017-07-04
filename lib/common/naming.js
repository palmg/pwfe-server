'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by chkui on 2017/6/21.
 */
var nameSpace = require('../config/namingRule');
var __name = void 0;

/**
 * 初始化命名规则
 */
var init = function init() {
  __name = nameSpace.init();
};
/**
 * 获取指定参数
 */
var getParam = function getParam(key) {
  return __name[key];
};

var setParam = function setParam(key, value) {
  __name[key] = value;
  return true;
};

var getEnv = function getEnv() {
  return __name;
};

var naming = { init: init, getParam: getParam, setParam: setParam, getEnv: getEnv };
exports.default = naming;