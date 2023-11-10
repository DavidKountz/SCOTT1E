function runSelf(args) {
    let output = args.replace("echo ", "");
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