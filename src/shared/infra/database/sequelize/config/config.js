require('dotenv').config()
const Sequelize = require('sequelize');

const { 
  ASR_DB_USER, 
  ASR_DB_PASS, 
  ASR_DB_HOST,
  DB_NAME,
  NODE_ENV,
  ASR_IS_PRODUCTION,
  CLEARDB_DATABASE_URL
} = process.env;

const databaseCredentials = {
  "development": {
    "username": ASR_DB_USER,
    "password": ASR_DB_PASS,
    "database": DB_NAME,
    "host": ASR_DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": ASR_DB_USER,
    "password": ASR_DB_PASS,
    "database": DB_NAME,
    "host": ASR_DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": ASR_DB_USER,
    "password": ASR_DB_PASS,
    "database": DB_NAME,
    "host": ASR_DB_HOST,
    "dialect": "postgres"
  }
};

const { 
  username, password, database, host, dialect 
} = databaseCredentials[NODE_ENV];

module.exports = databaseCredentials;

const mode = ASR_IS_PRODUCTION === "true" ? 'prod' : 'dev';

console.log(`[DB]: Connecting to the database in ${mode} mode.`)

module.exports.connection = ASR_IS_PRODUCTION === "true"
  ? new Sequelize(CLEARDB_DATABASE_URL) 
  : new Sequelize(database, username, password, {
    host,
    dialect,
    port: 5432,
    dialectOptions: {
      multipleStatements: true,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false
  }
);
