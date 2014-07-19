


var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename : '../database.sqlite'
    }
});


module.exports = require('bookshelf')(knex);
