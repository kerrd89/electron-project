require('sqlite3');

const database = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite',
  },
});

database.schema.hasTable('notes').then((exists) => {
  if (!exists) {
    return database.schema.createTable('notes', (t) => {
      t.increments('id').primary();
      t.string('title', 100);
      t.text('body');
      t.string('created_at');
    });
  }
});

module.exports = database;
