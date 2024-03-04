const express = require('express');
const app = express();
const path = require("path");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
const multer = require('multer');

require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,

    ssl: false
});

const HOSTNAME = "localhost";//"3.19.229.228";



console.log(process.env.DB_USER)

app.use(cors({
    credentials: true,
    origin: `http://localhost:3000`,
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
}));

app.use(express.json({limit:'10mb'}));

app.use(session({
    store: new pgSession({
        pool: pool,
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



app.get('/checkSession', (req, res) => {
    console.log('Session details":', req.session);

    if (req.session.username) {
        res.status(200).send({ sessionActive: true });
    } else {
        res.status(401).send({ sessionActive: false });
    }
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

// login validation function
app.post('/validatePassword', (req, res) => {
    const { username, password } = req.body;

    pool.query('SELECT password FROM credentials WHERE username = $1', [username], (err, result) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('Error fetching user');
        }

        if (result.rows.length > 0) {
            const user = result.rows[0];

            bcrypt.compare(password, user.password, (error, isMatch) => {
                if (error) {
                    console.error('Error checking password:', error);
                    return res.status(500).send('Error checking password');
                }

                if (isMatch) {
                    // Set username in the session
                    req.session.username = username;
                    console.log('Session set with username:', req.session.username);
                    return res.send({ validation: true, redirect: '/AdminDashboard' });
                } else {
                    return res.send({ validation: false });
                }
            });
        } else {
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
const {useEffect} = require("react");
const {diskStorage} = require("multer");

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





app.use(express.json());
app.use('/upload', express.static(path.join(__dirname, 'public', 'uploads')));


const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        // Correctly resolve the path to the uploads directory
        const uploadsDir = path.join(__dirname, 'public', 'uploads');
        callback(null, uploadsDir);
    },
    filename: function(req, file, callback) {
        console.log(file)
        // Generate the filename as before
        callback(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,

});






app.get('/api/Article/:id', async (req, res) => {
    try {
        const { id } = req.params; // Use the ID from the request parameters
        const queryResult = await pool.query('SELECT * FROM article WHERE article_id = $1', [id]);

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


app.post('/api/articles', upload.single('image'), async (req, res) => {
    const { title, author, content } = req.body;
    const image = req.file.path;

    try {
        const result = await pool.query(
            'INSERT INTO public.article (title, author, article_content, image) VALUES ($1, $2, $3, $4) RETURNING article_id',
            [title, author, content, image]
        );

        const newArticleId = result.rows[0].article_id;
        res.status(201).json({ message: 'Article created', article_id: newArticleId, imagePath: image });
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ message: 'Error creating article' });
    }
});

app.get('/api/Dropdown', async (req, res) => {
    try {

        const queryResult = await pool.query('SELECT article_id, title, article_content, image FROM article');

        if (queryResult.rows.length === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        console.log(queryResult)
        res.status(200).json(queryResult.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/api/Article3/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const { title, author, content } = req.body;

    try {
        const queryResult = await pool.query(
            'UPDATE article SET title = $1, author = $2, article_content = $3, image = $4 WHERE article_id = $4 RETURNING *',
            [title, author, content, id]
        );

        if (queryResult.rows.length === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json(queryResult.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});




app.delete('/api/Delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteResult = await pool.query('DELETE FROM article WHERE article_id = $1', [id]);

        if (deleteResult.rowCount === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});



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