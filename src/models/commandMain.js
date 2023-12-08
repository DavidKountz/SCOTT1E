async function command(cmd, arguments, username, directory) {
    // let cmdlet = cmd.split(" ")[0];
    // TODO: delete this test command
    // searches for a file in the "commands" directory and then runs the "main" method in that file.
    try {
        // TODO: add runHelp functions into each file
        let mod = await import(`./commands/${cmd}.js`);
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

        frame = `
        <section class="previousCommand">
            <span class="user"><span class="green">${username}@scott1e.com</span>:<span class="steel">${directory}</span>$</span>
            <span class="${cmd}">${cmd} ${arguments}</span>
            <p>${output}</p>
        </section>`;

        // TODO: DELETE DEBUGGING
        // replace with actual HTML output
        return frame;

    } catch (err) {
        console.log(err + `\n\nthe command "${cmd}" does not exist, or your syntax was incorrect.`);
		return `<section class="previousCommand">
            <span class="user"><span class="green">${username}@scott1e.com</span>:<span class="steel">${directory}</span>$</span>
            <span class="${cmd}">${cmd} ${arguments}</span>
            <p>The given command ${cmd} does not exist, or your syntax was incorrect.</p>
        </section>`;
    }
}


module.exports = {
    command
};