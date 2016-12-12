'use strict';

var Application = require('spectron').Application;
var expect = require('chai').expect;
var assert = require('chai').assert;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

var appPath = path.join(__dirname, '..', 'app');

console.log(electronPath);

global.before(() => {
    chai.should();
    chai.use(chaiAsPromised);
});

describe('App starts and has correct title and buttons', () => {
  var app = null;

  beforeEach(() => {
    app = new Application({ path: electronPath, args: [appPath]});
    return app.start();
  });

  afterEach(() => {
    return app.stop();
  });

  it('opens a window, checks the title, checks the bounds of the app', () => {
    app.client.getWindowCount().should.eventually.equal(1);
    app.client.getTitle().should.eventually.equal('Notes');
    app.browserWindow.getBounds().then((app) => {
      assert.equal(app.height, 600);
      assert.equal(app.width, 800);
    });
  });

  it('save button exists and contains the correct text', () => {
    app.client.getText('#save')
      .then(buttonText => assert(buttonText === 'SAVE'));
    app.client.click('#save')
      .then((r) => assert(r.value === null))
  });

  it('new note button', () => {
    app.client.click('.new-note')
      .then(() => {
        app.client.getText('.note-title').should.eventually.equal('New Note');
        app.client.getText('.note-body').should.eventually.equal('Body');
        app.client.click('.delete-note');
        app.client.getText('.note-title').should.eventually.equal('');
        app.client.getText('.note-body').should.eventually.equal('');
      });
  });

  it('input field exists and has default null value', () => {
    return app.client.getText('input')
      .then(inputText => assert(inputText === ''));
  });
});
