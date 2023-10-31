// import command from "../models/commandMain.js";
// I cannot do this ^ this is trying to blend client-side with server-side JS and is impossible
// TODO: send a POST request with the command I want to send to the server
// TODO: create a receiver for that request, and act on that information

let history = document.getElementById("history");
let cli = document.getElementById("cliInterface");

cli.addEventListener("keyup", (keypress) => {
    if (keypress.key === "Enter") {
        console.log(`${keypress.key} was pressed, ${cli.value} is the current "command"`);
        sendRequest(cli.value, "~")
        cli.value = "";
    }
});

function sendRequest(cmd, directory) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status == 200) {
            let data = JSON.parse(this.responseText);
            // PERFORM AN ACTION WITH THIS - e.g. append it to history, change url to match directory
            // ... run an Easter egg, stuff like that.
        }
    };

    xhr.open("GET", `https://localhost:8080/${directory}/$${cmd}`, true)
    xhr.send();
}
