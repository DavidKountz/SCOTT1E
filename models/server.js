// handles POST requests from the clients. Should be things such as changing dirs,
// running commands, and opening files

// const command = require('commandMain.js');
const http = require("http");
const fs = require("fs");
const dir = "./commands";
const template = "";
let cmds = [];

function getCommands(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            return console.log("Unable to scan dir. Err: " + err);
        }

        files.forEach((file) => {
            let f = file.split(".")[0];
            console.log(f);
            cmds.push(f);
        });
    });
    console.log(cmds);
    return cmds;
}

getCommands(dir);
console.log(cmds);


const server = http.createServer((req, res) => {
    if (req.url.includes("articles")) {
        res.write("aaaaa");
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
