function runSelf(args) {
    let output = 'CLEAR';
    if (!args) {
        return "ERR_ARGS";
    }
    return output;
}

function runHelp() {
    // TODO: Replace this with actual help menu for cat command
    return "clears the screen";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;