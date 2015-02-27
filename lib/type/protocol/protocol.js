/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var Os             = require('os');
var Util           = require('util');
var serverModel    = require('socket.model.server');
var clientModel    = require('socket.model.client');
var tools          = require('socket.lib.tools');
var root           = require('package.root');
var validation     = require('./validation');
var initiator      = require('../../initiator');

exports.generateId = function generateId (socketOptions) {
  socketOptions.appName = socketOptions.appName || root.name;
  socketOptions.model   = socketOptions.model   || tools.pattern.getModel(socketOptions.pattern);

  switch (socketOptions.model) {
    case tools.pattern.CLIENT_MODEL_NAME:
      return clientModel.generateId(socketOptions);

    case tools.pattern.SERVER_MODEL_NAME:
      return serverModel.generateId(socketOptions);
  }
};

exports.setComputedOptions = function setComputedOptions (_socket, _package) {

  _socket.options.appName  = root.name;

  _socket.options.host     = Os.hostname().toLowerCase();
  _socket.options.pid      = process.pid;

  if (Util.isArray(_socket.options.port)) {
    _socket.options.maxPortNumber = _socket.options.port[1];
    _socket.options.port          = _socket.options.port[0];
  }

  _socket.options.usePath = (typeof _socket.options.usePath === 'boolean' ? _socket.options.usePath : false);

  // initialise library property holding all protocol specific methods
  _socket.lib        = _socket.lib || {};

  return _socket;
};

exports.init     = function init (_socket, _package) {

  _socket = initiator.init(_socket);

  _socket.options.protocol = tools.protocol.fromPackageName(_package.name);

  // add computed configuration options
  exports.setComputedOptions(_socket, _package);

  // check common options
  validation.commonOptions(_socket.options);

  // generate ID
  _socket.id = exports.generateId(_socket.options);

  // apply the requested socket model: client or server
  initiator.applyModel(_socket, _package);

  // add reference to _socket in the protocol library
  initiator.addParent(_socket, _socket.lib);

  return _socket;
};
