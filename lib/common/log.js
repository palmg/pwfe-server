"use strict";

/**
 * Created by chkui on 2017/6/21.
 */

var log = function log() {
  var _console;

  (_console = console).log.apply(_console, arguments);
};

module.exports = log;