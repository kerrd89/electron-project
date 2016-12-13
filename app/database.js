require('sqlite3');
var path = require('path');

const database = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join('/Users/davidkerr/Projects/electron-project/app', './db.sqlite'),
  },
  useNullAsDefault: true,
});

database.schema.hasTable('notes').then((exists) => {
  if (!exists) {
    return database.schema.createTable('notes', (t) => {
      t.increments('id').primary();
      t.string('title', 100);
      t.text('body');
      t.string('created_at');
      t.integer('flagged');
    });
  }
});

module.exports = database;
