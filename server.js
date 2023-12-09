const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');

const pool = new Pool({
    user: 'scott1e',
    host: 'scott1e-2.cmlmsmkkjrux.us-east-2.rds.amazonaws.com',
    database: 'scott1edb',
    password: 'theSeas1',
    port: 5432,
});

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json({limit:'10mb'}));

app.use(session({
    store: new pgSession({
        pool: pool, // Use the pool created above
        tableName: 'sessions'
    }),
    secret: 'your secret key', // Replace 'your secret key' with a real secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

// login validation function
app.post('/validatePassword', (req, res) => {
    const { username, password } = req.body;

    pool.query('SELECT password FROM credentials WHERE username = $1', [username], (err, result) => {
        if (err) {
            res.status(500).send('Error fetching user');
        } else if (result.rows.length > 0) {
            const user = result.rows[0];
            // Compare submitted password with stored hash
            bcrypt.compare(password, user.password, (error, isMatch) => {
                if (error) {
                    res.status(500).send('Error checking password');
                } else if (isMatch) {
                    // Set up session or whatever you need to do on successful login
                    res.send({ validation: true });
                } else {
                    res.send({ validation: false });
                }
            });
        } else {
            // User not found
            res.send({ validation: false });
        }
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send('Could not log out, please try again');
        } else {
            // End the session and clear the cookie
            res.clearCookie('connect.sid'); // "connect.sid" is the default name of the session ID cookie
            res.send('Logged out successfully');
        }
    });
});

// check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).send('You are not authenticated');
    }
}

app.get('/admin-dashboard', isAuthenticated, (req, res) => {
    // Only authenticated users can access this
    res.send('Welcome to the admin dashboard');
});

app.listen(3001, () => console.log('Listening at port 3001'));