const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432';

const client = new pg.Client(connectionString);

client.connect();

const query = client.query(
    'CREATE TABLE absolvents(id SERIAL PRIMARY KEY, first_name VARCHAR(40) not null, last_name VARCHAR(40), school VARCHAR(40))');
query.on('end', () => { client.end(); });
