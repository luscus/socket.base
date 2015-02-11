/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var base         = require('../lib/socket.base');
var tools        = require('socket.lib.tools');
var socket       = require('../lib/socket');
var serverModel  = require('socket.model.server');
var clientModel  = require('socket.model.client');


describe('socket.lib.base:', function () {

  it('init', function () {
    base.should.have.property('init');
    base.init.should.be.an('function');
    base.init.should.deep.equal(socket.init);
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
