
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
    return "Prints to terminal the given file. Currently performs no additional actions, and '..' is unsupported. This will render HTML files.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;