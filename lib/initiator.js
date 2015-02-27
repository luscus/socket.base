/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var tools          = require('socket.lib.tools');
var merge          = require('node.extend');
var EventEmitter   = require('events').EventEmitter;
var serverModel    = require('socket.model.server');
var clientModel    = require('socket.model.client');

exports.applyModel   = function applyModel (_socket) {

  switch (_socket.options.model) {
    case tools.pattern.SERVER_MODEL_NAME:
      serverModel.apply(_socket);
      serverModel.validate(_socket.options);
      break;

    case tools.pattern.CLIENT_MODEL_NAME:
      clientModel.apply(_socket);
      clientModel.validate(_socket.options);
      break;
  }

  return _socket;
};

exports.addParent = function addParent (_socket, module) {
  module.parent = _socket;
};

exports.init = function init (_socket) {
  if (! (_socket.emitter instanceof EventEmitter)) {
    var options = merge(true, {}, _socket);

    _socket                  = {};
    _socket.options          = options;
    _socket.options.model    = tools.pattern.getModel(_socket.options.pattern);

    // emitter is not defined,
    // setting the emitter
    _socket.emitter = new EventEmitter();
    _socket.emit    = _socket.emitter.emit;
    _socket.on      = _socket.emitter.on;
  }

  // initialise library property holding all protocol specific methods
  _socket.lib = _socket.lib || {};

  return _socket;
};
