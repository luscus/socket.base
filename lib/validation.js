/* jshint node:true */
'use strict';

var Assert  = require('assert-plus');

exports.commonOptions = function commonOptions (options) {

  // has a "protocol" option: http, https, tcp, ...
  Assert.string(options.protocol, 'options.protocol');

  // has a "pattern" option: req, rep, sub, pub, ...
  Assert.string(options.pattern, 'options.pattern');
};
