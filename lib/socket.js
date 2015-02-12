/* jshint node:true */
'use strict';

var Os             = require('os');
var EventEmitter   = require('events').EventEmitter;
var Util           = require('util');
var merge          = require('node.extend');
var tools          = require('socket.lib.tools');
var serverModel    = require('socket.model.server');
var clientModel    = require('socket.model.client');
var validation     = require('./validation');


exports.setComputedOptions = function setComputedOptions (_socket, _package) {

  _socket.config.model    = tools.pattern.getModel(_socket.config.pattern);
  _socket.config.host     = Os.hostname().toLowerCase();
  _socket.config.pid      = process.pid;

  if (Util.isArray(_socket.config.port)) {
    _socket.config.maxPortNumber = _socket.config.port[1];
    _socket.config.port          = _socket.config.port[0];
  }

  _socket.config.usePath = (typeof _socket.config.usePath === 'boolean' ? _socket.config.usePath : false);

  // initialise library property holding all protocol specific methods
  _socket.lib        = _socket.lib || {};

  return _socket;
};

exports.applyModel   = function applyModel (_socket) {

  switch (_socket.config.model) {
    case tools.pattern.SERVER_MODEL_NAME:
      serverModel.apply(_socket);
      serverModel.validate(_socket.config);
      break;

    case tools.pattern.CLIENT_MODEL_NAME:
      clientModel.apply(_socket);
      clientModel.validate(_socket.config);
      break;
  }

  return _socket;
};

exports.addParent = function addParent (_socket, module) {
  module.parent = _socket;
};

exports.init     = function init (_socket, _package) {
  if (! (_socket.emitter instanceof EventEmitter)) {
    var config = merge(true, {}, _socket);

    _socket                 = {};
    _socket.config          = config;
    _socket.config.protocol = tools.protocol.fromPackageName(_package.name);

    // emitter is not defined,
    // setting the emitter
    _socket.emitter = new EventEmitter();
    _socket.emit    = _socket.emitter.emit;
    _socket.on      = _socket.emitter.on;
  }

  // add computed configuration options
  exports.setComputedOptions(_socket, _package);

  // check common options
  validation.commonOptions(_socket.config);

  // apply the requested socket model: client or server
  exports.applyModel(_socket, _package);

  // add reference to _socket in the protocol library
  exports.addParent(_socket, _socket.lib);

  return _socket;
};
