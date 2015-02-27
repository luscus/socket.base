/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var protocol       = require('./type/protocol/protocol');
var connector      = require('./type/connector/connector');
var serverModel    = require('socket.model.server');
var clientModel    = require('socket.model.client');
var tools          = require('socket.lib.tools');

var isConnector    = require('./type/connector/validation').isConnector;
var isProtocol     = require('./type/protocol/validation').isProtocol;

exports.tools      = tools;
exports.models     = {
  client: clientModel,
  server: serverModel
};

exports.init       = function init (_socket, _package) {
  if (isConnector(_package.name)) {
    return connector.init(_socket, _package);
  }
  else if (isProtocol(_package.name)) {
    return protocol.init(_socket, _package);
  }
  else {

  }
};

exports.generateId = function generateId (_socketOptions) {
  if (isConnector(_package.name)) {
    return connector.generateId(_socketOptions);
  }
  else if (isProtocol(_package.name)) {
    return protocol.generateId(_socketOptions);
  }
};
