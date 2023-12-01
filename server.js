const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const sqlite3 = require('sqlite3').verbose();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.json({limit:'10mb'}))

app.use(session({
    store: new SQLiteStore({
        db: 'sessions.db',
        dir: './var/db' // Specify the directory where 'sessions.db' will be stored.
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

let db = new sqlite3.Database('credentials.db', (err)=> {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.')
})

// login validation function
app.post('/validatePassword', (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT password FROM credentials WHERE username = ?`, [username], (err, row) => {
        if (err) {
            res.status(500).send('Error fetching user');
        } else if (row) {
            // Compare submitted password with stored hash
            bcrypt.compare(password, row.password, (err, result) => {
                if (err) {
                    res.status(500).send('Error checking password');
                } else if (result) {
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



/**
 * 
 * MATTHIAS' (FUNCTIONAL) CODE
 * 
 */


const fs = require("fs"),
    {command} = require("./src/models/commandMain"),
    dir = "./src/models/commands",
    path = require("path"),
    home = path.join(__dirname, "/src/index.html");

let commands = [];
// reads all files in a folder
// read the directory
fs.readdir(dir, (err, files) => {
if (err) {
    console.log("Unable to scan dir. Err: " + err);
}

files.forEach((file) => {
    let f = file.split(".")[0];
        commands.push('"' + f + '"');
    });
});

app.get('/commands', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');
    res.send(`{"commands": [${commands}]}`);
});

app.get("/commands/:directory/:command/:args/:username",  async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');

    let directory = req.params.directory;
    let action = req.params.command;
    let args = req.params.args;
    // TODO: remove this temporary username implementation and factor in Disqus
    let TEMPUSERNAME = req.params.username;

    let test;
    try {
        test = (await command(action + " " + args, TEMPUSERNAME, directory));

        // converting and parsing this so that it can be JSON-ified
        test = test.replaceAll("\n", "\\n").replaceAll('"', '\\"');
    }
    catch {
        console.log("command does not exist");
        test = "The given command does not exist";
    }

    JSON.parse(`{"test": "${test}"}`);

    res.send(`{"command": "${action}", "args": "${args}", "output": "${test}"}`);
});


app.get("/", (req, res) => {
    fs.readFile(home, {encoding: "utf-8"}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.setHeader(200, {'Content-Type': 'text/html'});
            res.send(data);
        }
    });
});

// END OF MY EPIC CODE

app.listen(3001, () => console.log('Listening at port 3001'));