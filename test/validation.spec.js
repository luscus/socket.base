/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var EventEmitter = require('events').EventEmitter;
var tools        = require('socket.lib.tools');
var validation   = require('../lib/validation');
var pattern      = tools.pattern;

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


describe('Validation Methods:', function () {

  describe('commonOptions:', function () {

    it('exists', function () {
      validation.should.have.property('commonOptions');
      validation.commonOptions.should.be.a('function');
    });

  });
});
