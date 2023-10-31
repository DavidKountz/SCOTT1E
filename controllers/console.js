// import command from "../models/commandMain.js";
// I cannot do this ^ this is trying to blend client-side with server-side JS and is impossible
// TODO: send a POST request with the command I want to send to the server
// TODO: create a receiver for that request, and act on that information

let history = document.getElementById("history");
let cli = document.getElementById("cliInterface");

cli.addEventListener("keyup", (keypress) => {
    if (keypress.key === "Enter") {
        console.log(`${keypress.key} was pressed, ${cli.value} is the current "command"`);
        command(cli.value, "guest", "~")
        cli.value = "";
    }
});
