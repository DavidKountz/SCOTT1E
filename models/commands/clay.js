function runSelf(args) {
    let output = 'This will output and be formatted. This is clay';
    if (!args) {
        return "ERR_ARGS";
    }
    return output;
}

function runHelp() {
    // TODO: Replace this with actual help menu for cat command
    return "HELP";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;