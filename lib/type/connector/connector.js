/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var root           = require('package.root');
var initiator      = require('../../initiator');

exports.generateId = function generateId (socketOptions) {

  socketOptions           = socketOptions || this.options;
  socketOptions.appName   = socketOptions.appName || root.name;

  var id =
    socketOptions.appName +
    ':connector:' +
    socketOptions.connector +
    ':' +
    socketOptions.pattern +
    ':' +
    socketOptions.target;

  return id;
};

exports.init = function init (_socket, _package) {

  _socket = initiator.init(_socket);

  // generate ID
  _socket.id  = exports.generateId(_socket.options);

  // apply the requested socket model: client or server
  initiator.applyModel(_socket, _package);

  // add reference to _socket in the protocol library
  initiator.addParent(_socket, _socket.lib);

  return _socket
};
