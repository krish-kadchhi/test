import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;
const connectionString = process.env.DATABASE_URL;

console.log('Testing connection to:', connectionString.replace(/:([^@]+)@/, ':****@'));

const client = new Client({
  connectionString: connectionString,
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Successfully connected to Postgres!');
    
    const res = await client.query('SELECT current_database(), current_user');
    console.log('Info:', res.rows[0]);
    
    await client.end();
  } catch (err) {
    console.error('Connection error:', err.message);
    if (err.detail) console.error('Detail:', err.detail);
    if (err.hint) console.error('Hint:', err.hint);
    process.exit(1);
  }
}

testConnection();
