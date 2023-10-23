import command from "../models/commandMain.js";
let history = document.getElementById("history");
let cli = document.getElementById("cliInterface");

cli.addEventListener("keyup", (keypress) => {
    if (keypress.key === "Enter") {
        console.log(`${keypress.key} was pressed, ${cli.value} is the current "command"`);
        command(cli.value, "guest", "~")
        cli.value = "";
    }
});
