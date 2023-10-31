async function command(cmd, username, directory) {
	let cmdlet = cmd.split()[0];
	// TODO: delete this test command
	let TEMPTESTCOMMAND = "whoami -l -w -l+ratio";
	// searches for a file in the "commands" directory and then runs the "main" method in that file.
	try {
		// TODO: add runHelp functions into each file
		let mod = await import(`./commands/${cmdlet}.js`);
		let output = "";
		let frame = ``;

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

		frame = `
		<section class="previousCommand">
			<span class="user"><span class="green">${username}@scott1e.com</span>:<span class="steel">${directory}</span>$</span>
			<span class="${cmd}">${cmd}</span>
			<p>
				${output}
			</p>
		</section>`;

		console.log(frame);
		// TODO: DELETE DEBUGGING
		// replace with actual HTML output

	} catch (err) {
		console.log(err + " this command does not exist.");
	}
}

// TODO - change this. Should accept prompts from the user, and then later should accept information from the textbox
let c = "whoami";

command(c,"guest","~");
