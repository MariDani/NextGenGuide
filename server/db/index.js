const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432';

const client = new pg.Client({
  user: 'arnoldov',
  host: 'localhost',
  database: 'next-gen-guide-development',
  password: '',
  port: 5432,
})

client.connect();

module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback)
  }
}
