var Application = require('spectron').Application
var expect = require('chai').expect;
var assert = require('chai').assert;
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

var appPath = path.join(__dirname, '..', 'app');

console.log(electronPath);

global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
});

describe('App starts and has correct title and buttons', function () {
  var app = null
  beforeEach(function () {
      app = new Application({ path: electronPath, args: [appPath]});
      return app.start();
  });

  afterEach(function () {
    return app.stop();
  })

  it('opens a window', function () {
    return app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1);
  });

  it('save button exists', function () {
    return app.client.getText('#save')
      .then(buttonText => assert(buttonText === 'SAVE'));
  });
});
