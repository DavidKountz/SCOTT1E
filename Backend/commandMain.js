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

// function processCommand(cmd) {
// 	import(`./commands/${cmd}.js`).then((mod) => {
// 		var output = mod.runSelf();
// 		return output;
// 	}).catch((err) => {
// 		console.log(err.message + " this command does not exist.");
// 	});

// 	return output;
// }

async function command(cmd) {
	// searches for a file in the "commands" directory and then runs the "main" method in that file.
	try {
		let mod = await import(`./commands/${cmd}.js`);
		let output = mod.runSelf();
		console.log(output);
	} catch (err) {
		console.log(err + " this command does not exist.");
	}
}

command("whoami");

//console.log(text);