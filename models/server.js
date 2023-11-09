// handles POST requests from the clients. Should be things such as changing dirs,
// running commands, and opening files

// const command = require('commandMain.js');
const http = require("http");
const fs = require("fs");
const commands = []
const template = `
<h1>This is an article example</h1>
<p id="data-to-input"></p>
`;



const server = http.createServer((req, res) => {
    if (req.url.includes("articles")) {
        res.write();
        res.end();
    } else {
        res.write("article!!!!!!!!!!!!!");
        res.end();
    }

});
server.on('connection', (socket) => {
    console.log("new connection");
});
server.listen(3000);
console.log("Listening on port 3000");


//
// function receivePost() {
//     let command = true;
//
//     if (command) {
//         runCommand();
//     }
// }
//
// function runCommand(cmd, username, dir) {
//     command.command(cmd, username, dir);
// }
//
