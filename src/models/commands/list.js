
async function getCommands(dir) {
    let output = "[LIST]";

    return output;
}

async function runSelf(args) {
    let output = await getCommands("./");

    console.log(output);
    return output;

}

function runHelp() {
    return "Lists the available commands.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;