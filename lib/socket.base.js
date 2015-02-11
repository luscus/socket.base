/* jshint node:true */
'use strict';

var socket       = require('./socket');
var serverModel  = require('socket.model.server');
var clientModel  = require('socket.model.client');

exports.init   = socket.init;
exports.models = {
  client: clientModel,
  server: serverModel
};
