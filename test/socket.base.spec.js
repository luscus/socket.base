/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var base         = require('../lib/socket.base');
var tools        = require('socket.lib.tools');
var socket       = require('../lib/type/protocol/protocol');
var serverModel  = require('socket.model.server');
var clientModel  = require('socket.model.client');


describe('socket.lib.base:', function () {

  it('init', function () {
    base.should.have.property('init');
    base.init.should.be.a('function');
  });

  it('generateId', function () {
    base.should.have.property('generateId');
    base.generateId.should.be.a('function');

    var socketOptions = {
      "name": "input",
      "protocol": "ws",
      "port": 25060,
      "pattern": "pub"
    };

    base.generateId(socketOptions).should.be.a('string', serverModel.generateId(socketOptions));

    socketOptions.pattern = 'sub';
    socketOptions.model   = undefined;

    base.generateId(socketOptions).should.be.a('string', clientModel.generateId(socketOptions));
  });

  it('models property exists', function () {
    base.should.have.property('models');
    base.models.should.be.an('object');
  });

  describe('models:', function () {

    it('client exists', function () {
      base.models.should.have.property('client');
      base.models.client.should.be.an('object');
      base.models.client.should.deep.equal(clientModel);
    });

    it('server exists', function () {
      base.models.should.have.property('server');
      base.models.server.should.be.an('object');
      base.models.server.should.deep.equal(serverModel);
    });

  });

  it('tools property exists', function () {
    base.should.have.property('tools');
    base.tools.should.be.an('object');
    base.tools.should.deep.equal(tools);
  });

});
