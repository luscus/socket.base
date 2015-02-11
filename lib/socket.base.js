/* jshint node:true */
'use strict';

var socket       = require('./socket');
var serverModel  = require('socket.model.server');
var clientModel  = require('socket.model.client');
var tools        = require('socket.lib.tools');

exports.init   = socket.init;
exports.tools  = tools;
exports.models = {
  client: clientModel,
  server: serverModel
};
