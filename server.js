const express = require('express');
const app = express();
const path = require("path");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false // For development purposes only
    }
});

const HOSTNAME = "localhost";//"3.19.229.228";

app.use(cors({
    credentials: true,
    origin: `http://${HOSTNAME}:3000`,
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
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

app.use(express.static(path.join(__dirname, '/build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/build/index.html'));
// });

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

// login validation function
app.post('/validatePassword', (req, res) => {
    console.log('Request body:', req.body);
    const { username, password } = req.body;

    pool.query('SELECT password FROM credentials WHERE username = $1', [username], (err, result) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('Error fetching user');
        }

        if (result.rows.length > 0) {
            const user = result.rows[0];

            // Make sure to check if password is not undefined
            if (!user.password) {
                return res.status(500).send('No password set for this user');
            }

            bcrypt.compare(password, user.password, (error, isMatch) => {
                if (error) {
                    console.error('Error checking password:', error);
                    return res.status(500).send('Error checking password');
                }

                if (isMatch) {
                    // TODO: Set up session or token for successful login
                    // Redirect to admin dashboard or send a success response
                    return res.send({ validation: true, redirect: '/admin-dashboard' });
                } else {
                    return res.send({ validation: false });
                }
            });
        } else {
            // User not found
            return res.send({ validation: false });
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
// function isAuthenticated(req, res, next) {
//     if (req.session.userId) {
//         next();
//     } else {
//         res.status(401).send('You are not authenticated');
//     }
// }

// app.get('/admin-dashboard', isAuthenticated, (req, res) => {
//     // Only authenticated users can access this
//     res.send('Welcome to the admin dashboard');
// });

/**
 *
 * MATTHIAS' (FUNCTIONAL) CODE
 *
 */


const fs = require("fs"),
    {command} = require("./src/models/commandMain"),
    dir = "./src/models/commands",
    // path = require("path"), //added require statement to top of server.js file
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

app.get(('/commands'), (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');
    res.send(`{"commands": [${commands}]}`);
});

app.get(("/commands/:directory/:command/:args/:username"),  async (req, res) => {
    console.log(`api request received ${req.url}`);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');

    let directory = req.params.directory;
    let action = req.params.command;
    let args = req.params.args;
    // args = decodeURIComponent(args);
    // you do NOT want to decode, as the url normally decodes itself. You can cause issues with this
    // such as "malformed url" errors and whatnot.
    try {
        args = JSON.parse(args);
    } catch {
        //res.status(400).send("404 : The given url does not exist.");
    }

    // TODO: remove this temporary username implementation and factor in Disqus
    let TEMPUSERNAME = req.params.username;

    let test;
    try {
        test = (await command(action, args, TEMPUSERNAME, directory));

        // converting and parsing this so that it can be JSON-ified
        // test = test.replaceAll("\n", "\\n").replaceAll('"', '\\"');
        test = JSON.stringify(test);
    }
    catch {
        console.log("command does not exist");
        test = "The given command does not exist";
    }

    args = encodeURIComponent(args);

    res.send(JSON.stringify(`{"command": "${action}", "args": "${args}", "output": ${test}}`));
});

// (TEMPORARILY) END MY CODE

//Sifan's section


const textfilesFolderPath = path.join(__dirname, './src/components/textfiles');
let articles = [];

fs.readdir(textfilesFolderPath, (err, files) => {
    if (err) {
        console.error('Error reading the folder:', err);
        return;
    }

    files.forEach((file) => {
        const filePath = path.join(textfilesFolderPath, file);
        fs.readFile(filePath, 'utf8', (err, data) => {
            articles.push({ content: data, fileName: file });

            if (articles.length === files.length) {
                startServer();
            }
        });
    });
});

module.exports.articles = articles;


app.get('/articles/:articleIndex', (req, res) => {
    const articleIndex = parseInt(req.params.articleIndex);
    if (!isNaN(articleIndex) && articleIndex >= 0 && articleIndex < articles.length) {
        const template = `
                <html lang="en">
                  <head>
                    <title>Article Page</title>
                  </head>
                  <body>
                    <h1>My Article</h1>
                    <p>${articles[articleIndex].content}</p>
                  </body>
                </html>
            `;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(template);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Article not found');
    }
});


function startServer (){
    app.route('/edit/:articleIndex')
        .get((req, res) => {
            const articleIndex = parseInt(req.params.articleIndex);

            if (!isNaN(articleIndex) && articleIndex >= 0 && articleIndex < articles.length) {

                const editForm = `
                <html lang="en">
                    <head>
                        <title>Edit Text File</title>
                    </head>
                    <body>
                        <h1>Edit Text File</h1>
                        <form action="/edit/${articleIndex}" method="post">
                            <textarea name="content" rows="100" cols="300">${articles[articleIndex].content}</textarea>
                            <br>
                            <input type="submit" value="Save">
                            <br>
                        </form>
                        <form action="profile.html"  method="get">
                            <button type="submit">Back</button>
                        </form>
                    </body>
                </html>
            `;
                res.status(200).send(editForm);
            } else {
                res.status(404).send('Text file not found');
            }
        }).post(express.urlencoded({extended: true}), (req, res) => {
        const articleIndex = parseInt(req.params.articleIndex);

        if (!isNaN(articleIndex) && articleIndex >= 0 && articleIndex < articles.length) {

            articles[articleIndex].content = req.body.content;
            const fileName = articles[articleIndex].fileName;
            const filePath = path.join(textfilesFolderPath, fileName);
            fs.writeFile(filePath, req.body.content, 'utf8', (err) => {
                if (err) {
                    res.status(500).send('Error saving text file');
                } else {
                    res.redirect(`/edit/${articleIndex}`);
                }
            });
        } else {
            res.status(404).send('Text file not found');
        }
    });


}


app.get('/api/analytics', (req, res) => {
    const analyticsData = [
        { title: "Article 1", views: 150, comments: 10 },
        { title: "Article 2", views: 75, comments: 5 },
        // placeholder data
    ];
    res.json(analyticsData);
});

// BEGIN MY CODE AGAIN - MATTHIASVM

app.get(("/*"), (req, res) => {
    console.log(`received terminal ${req.url}`);
    res.sendFile(home);
});

// END OF MY EPIC CODE

app.listen(3001, () => console.log('Listening at port 3001'));