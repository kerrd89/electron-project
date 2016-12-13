require('sqlite3');
var path = require('path');
const isDev = () => process.env.NODE_ENV === 'development';
const directory = isDev() ? process.cwd() : process.env.APP_PATH;

const database = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(directory, './db.sqlite'),
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
