'use strict';

const electron = require('electron');
const path = require('path');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
let config = {};

if (process.env.NODE_ENV === 'development') {
  config = require('../config');
  config.url = `http://localhost:${config.port}`;
} else {
  config.devtron = false;
  config.url = `file://${__dirname}/dist/index.html`;
}

function createWindow () {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    minWidth: 600,
    minHeight: 500,
    titleBarStyle: 'hidden-inset',
    title: 'Notes',
    show: true,
  });

  mainWindow.loadURL(config.url);

  mainWindow.once('read-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => mainWindow = null);

  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'));

    let installExtension = require('electron-devtools-installer');

    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then((name) => mainWindow.webContents.openDevTools())
      .catch((err) => console.log('An error occurred: ', err));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  console.log('mainWindow opened');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const confirmDelete = exports.confirmDelete = (win) => {
  const response = electron.dialog.showMessageBox(win, {
    type: 'warning',
    buttons: ['Delete', 'Cancel'],
    message: 'Are you sure you want to delete this note?',
    icon: null,
  });
  if (!response) { return true; }
  return false;
};
