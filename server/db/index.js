const pg = require('pg');

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,    
  database: process.env.DB_NAME,
  port: 5432,
})

client.connect();

module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback)
  }
}
