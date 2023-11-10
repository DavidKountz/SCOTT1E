function runSelf(args) {
    let output = args;
    if (!args) {
        return "ERR_ARGS";
    }

    return output;

}

function runHelp() {
    return "Prints the given arguments to terminal.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;