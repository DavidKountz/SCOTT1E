function runSelf() {
	let output = `THIS IS WHOAMI TEST OUTPUT`;
    return output;
}

function runHelp() {
    // TODO: Replace this with actual help menu for cat command
    return "HELP2 - whoami"
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;