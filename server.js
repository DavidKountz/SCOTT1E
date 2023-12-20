const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
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
    ssl:  false // For development purposes only

});

console.log(process.env.DB_USER)
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


app.get(("/"), (req, res) => {
    console.log(`received terminal ${req.url}`);
    res.sendFile(home);
});

// END OF MY EPIC CODE



//Sifan's section





app.use(express.json());

app.get('/api/Article1', async (req, res) => {
    try {
        //const { id } = req.params;
        const queryResult = await pool.query('SELECT * FROM article WHERE article_id = $1', [1]);

        if (queryResult.rows.length === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(queryResult.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/articles', async (req, res) => {
    const { title, author, content } = req.body;
    try {
        const result = await pool.query('INSERT INTO articles (title, author, content) VALUES ($1, $2, $3) RETURNING article_id', [title, author, content]);
        const newArticleId = result.rows[0].article_id;
        res.status(201).json({ message: 'Article created', article_id: newArticleId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating article' });
    }
});






/*function startServer (){
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


}*/

app.get('/api/analytics', (req, res) => {
    const analyticsData = [
        { title: "Article 1", views: 150, comments: 10 },
        { title: "Article 2", views: 75, comments: 5 },
        // placeholder data
    ];
    res.json(analyticsData);
});

app.listen(3001, () => console.log('Listening at port 3001'));