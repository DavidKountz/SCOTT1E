// handles POST requests from the clients. Should be things such as changing dirs,
// running commands, and opening files

require('commandMain.js')();

function receivePost() {
    let command = true;

    if (command) {
        runCommand();
    }
}

function runCommand(cmd, username, dir) {
    command(cmd, username, dir);
}

