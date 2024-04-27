const { Pool } = require('pg');

// Assuming you store the connection string in an environment variable for security purposes
// Make sure to set this environment variable in your system or .env file
const connectionString = 'postgres://default:aAyqvRZ71gPW@ep-ancient-dawn-a40r4wym.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require';

const pool = new Pool({
    connectionString: connectionString
});

async function testConnection() {
    try {
        // Query to select all records from the credentials table
        const res = await pool.query('SELECT * FROM credentials');
        console.log('Data retrieved from credentials table:', res.rows);
        pool.end(); // Close the connection pool after the query
    } catch (error) {
        console.error('Error connecting to the database:', error);
        pool.end(); // Ensure the pool is closed in case of an error
    }
}

testConnection();