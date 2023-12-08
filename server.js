const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const textfilesFolderPath = path.join(__dirname, 'textfiles');
let articles = [

];

// reads the text files from the "textfiles" folder and store them in the articles array
fs.readdir(textfilesFolderPath, (err, files) => {
    if (err) {
        console.error('Error reading the folder:', err);
        return;
    }

    console.log(__dirname)
    // goes through the list of files
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
function startServer() {
    // handles requests for articles
    app.get('/articles/:articleIndex', (req, res) => {
        const articleIndex = parseInt(req.params.articleIndex);
        if (!isNaN(articleIndex) && articleIndex >= 0 && articleIndex < articles.length) {
            // creates an HTML page with the content from the articles array
            const template = `
                <html lang = en>
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

    //edits and saves changes made on text files
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
        }).post(express.urlencoded({ extended: true }), (req, res) => {
            const articleIndex = parseInt(req.params.articleIndex);

            if (!isNaN(articleIndex) && articleIndex >= 0 && articleIndex < articles.length) {

                articles[articleIndex].content = req.body.content;// update the content in the articles array
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
    app.use(express.static(path.join(__dirname, 'views')));
    app.use(express.static(path.join(__dirname, 'public')));


    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}

module.exports.pop = articles;