// handles POST requests from the clients. Should be things such as changing dirs,
// running commands, and opening files

// const command = require('commandMain.js');
const http = require("http"),
    fs = require("fs"),
    {command} = require("./commandMain"),
    dir = "./commands",
    path = require("path"),
    home = path.join(__dirname, "../views/index.html");

let commands = [];
// reads all files in a folder
// read the directory
fs.readdir(dir, (err, files) => {
    if (err) {
        console.log("Unable to scan dir. Err: " + err);
    }

    files.forEach((file) => {
        let f = file.split(".")[0];
        commands.push(f);
    });
})



const server = http.createServer((req, res) => {
    if (req.url.includes("?")) {
        req.url.split("?");
        res.write("aaaaa");
        res.end();
    } else {

        fs.readFile(home, {encoding: "utf-8"}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
        });
    }
});

server.on('connection', (socket) => {
    console.log("new connection on");
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
