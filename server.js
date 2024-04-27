const express = require('express');
const app = express();
const path = require("path");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
const multer = require('multer');
const globals = import("./variables").globalvals;

require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,

    ssl: false
});

const HOSTNAME = globals.HOST;//"3.19.229.228";


app.get('/api/test', (req, res) => {
    res.status(200).json({ message: 'Test endpoint works' });
});


console.log(process.env.DB_USER)

app.use(cors({
    credentials: true,
    origin: `http://${globals.HOST}:${globals.SERVER_PORT}`,
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
}));

app.use(express.json({limit:'10mb'}));

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'sessions'
    }),
    secret: 'your secret key',
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

app.post('/api/change-password', async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!req.session.username) {
        return res.status(401).send({ message: 'Not authenticated' });
    }

    try {
        // Get password from db
        const userResult = await pool.query('SELECT password FROM credentials WHERE username = $1', [req.session.username]);
        if (userResult.rows.length === 0) {
            return res.status(404).send({ message: 'User not found.' });
        }

        const user = userResult.rows[0];

        // Verify passwords match
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ message: 'Current password is incorrect.' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        // Update password on db
        await pool.query('UPDATE credentials SET password = $1 WHERE username = $2', [hashedNewPassword, req.session.username]);

        res.send({ message: 'Password successfully changed.' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error while changing password.' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send('Could not log out, please try again');
        } else {
            // End the session and clear the cookie
            res.clearCookie('connect.sid');
            res.send('Logged out successfully');
        }
    });
});

app.get('/api/articleGrab', async (req, res) => {
    const searchTerm = req.query.searchTerm;
    let query = 'SELECT * FROM article';
    let params = [];

    if (searchTerm) {
        query += ' WHERE title ILIKE $1';
        params.push(`%${searchTerm}%`);
    }

    try {
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
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

app.get(('/commands/articles'), async (req, res) => {
    // using David's grabArticles for reference as the purpose is identical.
    console.log("Articles grabbed for autocompletion.")
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');

    try {
        const result = await pool.query('SELECT * FROM article');
        res.json(result.rows);
        // this sends *all* article data, so it will have to be parsed on client-side
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
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

app.get(('/commands/:command'), async (req, res) => {
    // using David's grabArticles for reference as the purpose is identical.
    console.log(`Incrementing command ${req.params.command}`)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');

    // making a separate try-catch for adding commands that don't exist
    try {
        const result = await pool.query(`SELECT * FROM commands WHERE name = '${req.params.command}'`);

        // if the row for that command does not exist
        const cmdCount = await pool.query("SELECT id FROM commands ORDER BY id ASC");
        if (result["rowCount"] === 0) {
            // initialize it at zero because the following SQL command will add one next.
            const success = await pool.query(`INSERT INTO commands VALUES (${cmdCount["rowCount"] + 1}, '${req.params.command}', 0)`);
            console.log("Success: " + success);
        }
    } catch (err) {
        console.log(err)
        console.log("FIRE FIRE FIRE FIRE ----------------");
    }

    try {
        await pool.query(`UPDATE commands SET uses = uses + 1 WHERE name = '${req.params.command}'`);
        res.status(200).send("Success")
        // this sends *all* article data, so it will have to be parsed on client-side
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// (TEMPORARILY) END MY CODE

//Sifan's section


app.use(express.json());
app.use('/upload', express.static(path.join(__dirname, 'public', 'uploads')));


const storage = multer.diskStorage({
    destination: function(req, file, callback) {

        const uploadsDir = path.join(__dirname, 'public', 'uploads');
        callback(null, uploadsDir);
    },
    filename: function(req, file, callback) {
        console.log(file);
        callback(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,

});





app.use(express.json());



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

app.get('/api/Article21', async (req, res) => {
    try {

        const queryResult = await pool.query('SELECT username FROM credentials');

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
    const image = req.file ? req.file.path : null;

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

        const queryResult = await pool.query('SELECT article_id, title, article_content FROM article');

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

    app.post('/api/articles', upload.single('image'), async (req, res) => {
    const { title, author, content } = req.body;
    const image = req.file ? req.file.path : null;




    try {
        const result = await pool.query(
            'INSERT INTO public.article (title, author, article_content, image) VALUES ($1, $2, $3, $4) RETURNING article_id',
            [title, author, content, image]
        );

        const newArticleId = result.rows[0].article_id;
        res.status(201).json({ message: 'Article created', article_id: newArticleId, imagePath: image1 });
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ message: 'Error creating article' });
    }
});




app.put('/api/Article3/:id', upload.single('image'),async (req, res) => {
    const { id } = req.params;

    const { title, author, content } = req.body;
    const image = req.file ? req.file.path : null;
    try {
        const queryResult = await pool.query(
            'UPDATE article SET title = $1, author = $2, article_content = $3, image = $4 WHERE article_id = $5 RETURNING *',
            [title, author, content, image, id]
        );

        if (queryResult.rows.length === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }


        res.json(queryResult.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
    console.log(image);
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





app.get('/api/analytics', async (req, res) => {
    try {
        // fetch articles analytics
        const articlesResult = await pool.query('SELECT title, views FROM article');

        // fetch commands analytics
        const commandsResult = await pool.query('SELECT name, uses FROM commands');

        // combine data
        const analyticsData = {
            article: articlesResult.rows,
            commands: commandsResult.rows
        };

        res.json(analyticsData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error fetching analytics data');
    }
});

// BEGIN MY CODE AGAIN - MATTHIASVM

app.get(("/*"), (req, res) => {
    console.log(`received terminal ${req.url}`);
    res.sendFile(home);
});

// END OF MY EPIC CODE

app.listen(globals.API_PORT_NUM, () => console.log(`Listening at port ${globals.API_PORT_NUM}`));