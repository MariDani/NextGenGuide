const pg = require('pg');

const client = new pg.Client({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,    
  database: 'next-gen-guide-development',
  port: 5432,
})

client.connect();

module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback)
  }
}
