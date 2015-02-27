/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var Assert  = require('assert-plus');


exports.PACKAGE_PREFIX_REGEX = /^socket\.protocol\./;


exports.commonOptions = function commonOptions (options) {

  // has a "protocol" option: http, https, tcp, ...
  Assert.string(options.protocol, 'options.protocol');

  // has a "pattern" option: req, rep, sub, pub, ...
  Assert.string(options.pattern, 'options.pattern');
};

exports.isProtocol = function isProtocol (socketInfo) {
  if (typeof socketInfo === 'string') {
    return socketInfo.match(exports.PACKAGE_PREFIX_REGEX) !== null;
  }
  else {
    return (socketInfo.protocol || socketInfo.options.protocol);
  }
};
