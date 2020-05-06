const knex = require('knex');
const dbConfig = require('../../knexfile');

const dbAmbient =
  process.env.NODE_ENV === 'test' ? dbConfig.test : dbConfig.development;

const connection = knex(dbAmbient);

module.exports = connection;

/**
 * create connection with database
 */
