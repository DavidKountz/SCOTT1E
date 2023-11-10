// import command from "../models/commandMain.js";
// I cannot do this ^ this is trying to blend client-side with server-side JS and is impossible
// TODO: send a POST request with the command I want to send to the server
// TODO: create a receiver for that request, and act on that information

let history = document.getElementById("history");
let cli = document.getElementById("cliInterface");
const PORT = 3000;

let commands;
getCommands();

cli.addEventListener("keyup", (keypress) => {
    let autocomplete = [];
    if (keypress.key === "Enter") {
        console.log(`${keypress.key} was pressed, ${cli.value} is the current "command"`);
        sendRequest(cli.value, "home")
        cli.value = "";
    }

    if (keypress.key === "Tab" || keypress.key === "ArrowRight") {
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].startsWith(cli.value)) {
                autocomplete.push(commands[i]);
            }
        }
        cli.focus();
        console.log(autocomplete);
    }
});

function getCommands() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status == 200) {
            commands = JSON.parse(this.responseText)["commands"];
            console.log(commands);
            // PERFORM AN ACTION WITH THIS - e.g. append it to history, change url to match directory
            // ... run an Easter egg, stuff like that.
        }
    };

    xhr.open("GET", `http://localhost:${PORT}/?commands`, true)
    xhr.send();
}

function sendRequest(cmd, directory) {
    let xhr = new XMLHttpRequest();
    let cmdSplit = cmd.split(" ");
    let command = cmdSplit[0];
    let args = cmd.replace(command, "").trim().replaceAll(" ", "+");

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status == 200) {
            let data = this.responseText;
            console.log(data);
            let formattedData = JSON.parse(data);
            // PERFORM AN ACTION WITH THIS - e.g. append it to history, change url to match directory
            // ... run an Easter egg, stuff like that.
        }
    };

    xhr.open("GET", `http://localhost:${PORT}/${directory}/?cmd=${command}&args=${args}`, true)
    xhr.send();
}
