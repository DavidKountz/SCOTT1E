function runSelf() {
	let output = `
	        <p>
                Hey! My name is Scott, and I'm super cool and stuff :D I like blogging I hope,
                because that's what this site is all about!<br><br>

                :D<br><br>

                <pre> <!-- https://www.asciiart.eu/text-to-ascii-art -->
                    ░█▀▀░█▀▀░█▀█░▀█▀░▀█▀░▀█░░█▀▀
                    ░▀▀█░█░░░█░█░░█░░░█░░░█░░█▀▀
                    ░▀▀▀░▀▀▀░▀▀▀░░▀░░░▀░░▀▀▀░▀▀▀
                    
                    
                </pre>
            </p>
	`;
    return output;
}

function runHelp() {
    // TODO: Replace this with actual help menu for cat command
    return "HELP2 - whoami"
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;