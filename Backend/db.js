// db.js
const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool instance using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Export a helper function for querying the database
module.exports = {
  query: (text, params) => pool.query(text, params),
};
