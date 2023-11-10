function runSelf(args) {
    let output = 'THIS IS A TEST CAT';
    if (!args) {
        return "ERR_ARGS";
    }

}

function runHelp() {
    // TODO: Replace this with actual help menu for cat command
    return "HELP";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;