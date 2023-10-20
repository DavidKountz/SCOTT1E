const fs = require("fs");

// may not be necessary
function loadCommands(path) {
	if (!path) {
		path = "./commands/";
	}

	files = fs.readdirSync(path);
	console.log(files);
	return files;
}

async function command(cmd) {
	let cmdlet = cmd.split()[0];
	// TODO: delete this test command
	let TEMPTESTCOMMAND = "whoami -l -w -l+ratio";
	// searches for a file in the "commands" directory and then runs the "main" method in that file.
	try {
		let mod = await import(`./commands/${cmdlet}.js`);
		let output = "";

		if (cmd.includes(" --help") || cmd.includes(" -h")) {
			output = mod.runHelp(cmd);
		} else {
			output = mod.runSelf(cmd);
		}

		switch (output) {
			case "ERR_ARGS":
				output = `One or more arguments were missing. Try ${cmdlet} -h or --help for more information.`;
				break;
		}

		console.log(output);
		// TODO: DELETE DEBUGGING
		// replace with actual HTML output

	} catch (err) {
		console.log(err + " this command does not exist.");
	}
}

command("whoami");

//console.log(text);