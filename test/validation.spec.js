/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var EventEmitter = require('events').EventEmitter;
var pattern      = require('../../lib/domains/pattern');
var validation   = require('../../lib/domains/validation');

var info = {name: 'socket.protocol.http'};
var emitter = new EventEmitter();
var config = {
  protocol: 'http',
  pattern:  pattern.CLIENT_PATTERNS[0],
  port:     666
};
var socket  = {
  realSocketObject:  true,
  config:  config,
  emitter: emitter,
  emit:    emitter.emit,
  on:      emitter.on
};


describe('Validation Library Methods:', function () {

  describe('socketObject:', function () {

    it('exists', function () {
      validation.should.have.property('socketObject');
      validation.socketObject.should.be.a('function');
    });

    it('handle socket object', function () {
      var _socket = validation.socketObject(socket, info);

      describe('properties:', function () {

        it('realSocketObject exists', function () {
          _socket.should.have.property('realSocketObject', true);
        });

        it('config.model exists', function () {
          _socket.config.should.have.property('model', pattern.CLIENT_MODEL_NAME);
        });
      });
    });

    it('handle non socket object', function () {
      var _socket = validation.socketObject(config, info);

      describe('properties:', function () {

        it('realSocketObject does not exists', function () {
          _socket.should.not.have.property('realSocketObject');
        });

        it('config.model exists', function () {
          _socket.config.should.have.property('model', pattern.CLIENT_MODEL_NAME);
        });
      });
    });
  });
});
