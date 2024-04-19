// import updateCommandUses from "../../server.js";
const publicDir = "public/";

async function command(cmd, arguments, username, directory) {
    // searches for a file in the "commands" directory and then runs the "main" method in that file.
    try {
        // TODO: add runHelp functions into each file
        let mod = await import(`./commands/${cmd}.js`);
        await fetch(`http://localhost:3001/commands/${cmd}`);
        let output = "";
        let frame = ``;

        if (arguments.includes("--help") || arguments.includes("-h")) {
            output = await mod.runHelp(arguments, directory);
        } else {
            output = await mod.runSelf(arguments, directory);
        }

        switch (output) {
            case "ERR_ARGS":
                output = `One or more arguments were missing. Try ${cmd} -h or --help for more information.`;
                break;
            case "CLEAR":
                output = "CLEAR"
                break;
        }

        if (output.includes("\n")) {
            output = output.replaceAll(/\n/g, "<br>");
        }

        frame = `
        <section class="previous-command">
            <span class="user"><span class="green">${username}@scott1e.com</span>:<span class="steel">${directory}</span>$</span>
            <span class="${cmd} past">${cmd} ${arguments}</span>
            <p class="terminal-output">${output}</p>
        </section>`;

        switch (output) {
            case "ADMIN":
                frame = "ADMIN";
                break;
        }

        // if the command is a special command, so [CLEAR] or [THEME] for example,
        // return just the command itself
        // see Terminal.js large comment - the switch statement issue
        // if (cmd !== "echo" && output.includes("[") && output.includes("]")) {
        //     frame = output;
        //     console.log(`COMMAND IS NOT ECHO AND IS SPECIAL: ${cmd}`);
        // }

        // TODO: DELETE DEBUGGING
        // replace with actual HTML output
        return frame;

    } catch (err) {
        console.log(err + `\n\nthe command "${cmd}" does not exist, or your syntax was incorrect.`);
		return `<section class="previousCommand">
            <span class="user"><span class="green">${username}@scott1e.com</span>:<span class="steel">${directory}</span>$</span>
            <span class="${cmd}">${cmd} ${arguments}</span>
            <p class="terminal-output">The given command ${cmd} does not exist, or your syntax was incorrect.</p>
        </section>`;
    }
}


module.exports = {
    command,
    publicDir
};