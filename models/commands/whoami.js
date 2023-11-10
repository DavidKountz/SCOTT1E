function runSelf() {
    let output = `
                Hey! My name is Scott, and I'm super cool and stuff :D I like blogging I hope,
                because that's what this site is all about!<br><br>

                :D<br><br>

                <pre> <!-- https://www.asciiart.eu/text-to-ascii-art -->
                    ░█▀▀░█▀▀░█▀█░▀█▀░▀█▀░▀█░░█▀▀
                    ░▀▀█░█░░░█░█░░█░░░█░░░█░░█▀▀
                    ░▀▀▀░▀▀▀░▀▀▀░░▀░░░▀░░▀▀▀░▀▀▀


                </pre>`;
    return output;
}

function runHelp() {
    // TODO: Replace this with actual help menu for cat command
    return "Displays information about this website and it's owner."
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;