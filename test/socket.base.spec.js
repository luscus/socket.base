/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var base    = require('../lib/socket.base');
var socket  = require('../lib/socket');


describe('socket.lib.base:', function () {

  it('init', function () {
    base.should.have.property('init');
    base.init.should.be.an('object');
    base.init.should.deep.equal(socket.init);
  });

});
