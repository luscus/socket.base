/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var Assert  = require('assert-plus');


exports.PACKAGE_PREFIX_REGEX = /^socket\.connector\./;


exports.commonOptions = function commonOptions (options) {

  // has a "name" option
  Assert.string(options.name, 'options.name');

  // has a "protocol" option: http, https, tcp, ...
  Assert.string(options.connector, 'options.connector');
};

exports.isConnector = function isConnector (socketInfo) {
  if (typeof socketInfo === 'string') {
    return socketInfo.match(exports.PACKAGE_PREFIX_REGEX) !== null;
  }
  else {
    return (socketInfo.connector || (socketInfo.options ? socketInfo.options.connector : false));
  }
};
