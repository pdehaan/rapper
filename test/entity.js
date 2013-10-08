var expect = require('chai').expect;
var entity = require('../lib/entity');
var stubServer = require('./stubs/server');
var extend = require('lodash.assign');

describe('.entity', function () {
  var user;
  
  beforeEach(function (done) {
    user = extend({}, entity, {
      path: '/users',
      id: 123,
      host: stubServer.STUB_HOST,
      headers: stubServer.HEADERS
    });
    
    stubServer.server.start(done);
  });
  
  afterEach(function (done) {
    stubServer.server.stop(done);
  });
  
  it('generates the url for the http request', function () {
    expect(user.url()).to.equal(stubServer.STUB_HOST + '/users/123');
  });
  
  it('gets the resource data for the current single endpoing', function (done) {
    user.get(function (err, data) {
      expect(err).to.equal(null);
      expect(data.method).to.equal('GET');
      done();
    });
  });
  
  it('udpates the current resource', function (done) {
    user.update({ name: 'olga' }, function (err, response) {
      expect(err).to.equal(null);
      expect(response.method).to.equal('PUT');
      expect(response.body).to.eql({ name: 'olga' });
      done();
    });
  });
  
  it('performs a DELETE request to remove the current resource', function (done) {
    user.remove(function (err, response) {
      expect(err).to.equal(null);
      expect(response.method).to.equal('DELETE');
      done();
    });
  });
  
  describe('#endpoint()', function () {
    var friends;
    
    beforeEach(function () {
      friends = user.endpoint('friends');
    });
    
    it('creates a nested endpoint', function () {
      expect(friends.url()).to.equal(user.url() + '/friends');
      expect(friends.headers).to.eql(stubServer.HEADERS);
    });
    
    it('creates a singular resource endpoing', function () {
      var friend = friends.one(456);
      expect(friend.url()).to.equal(user.url() + '/friends/456');
    });
    
    it('handles infinitely nested routes', function () {
      var friend = friends.one(456);
      var related = friend.endpoint('related');
      expect(related.url()).to.equal(friend.url() + '/related');
    });
  });
});