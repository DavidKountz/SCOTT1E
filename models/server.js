// handles POST requests from the clients. Should be things such as changing dirs,
// running commands, and opening files

// const command = require('commandMain.js');
const http = require("http");
const fs = require("fs");
const {command} = require("./commandMain");
const dir = "./commands";
const template = "";
let commands = [];


// reads all files in a folder
async function getCommands(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            return console.log("Unable to scan dir. Err: " + err);
        }

        files.forEach((file) => {
            let f = file.split(".")[0];
            commands.push(f);
        });
    });


    // it sleeps
    await sleep(1000);
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));

    }
    // it works
    // but it doesn't.

    return commands;
}

(async () => {
    commands = await getCommands(dir);
    console.log(commands);
})();
// please, God, why.
// why must I await
// awaiting sweet release, more like



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
