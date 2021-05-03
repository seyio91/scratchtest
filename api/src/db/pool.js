const pg = require("pg");
const dotenv = require("dotenv");

// pg.defaults.ssl = false;

// make config for different environments

dotenv.config();

const DATABASE_URL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
const databaseConfig = {
  connectionString: DATABASE_URL,
  ssl: false,
};

const pool = new pg.Pool(databaseConfig);

module.exports = pool;
