function runSelf(filename) {
    let output = '';
    if (!filename) {
        return "ERR_ARGS"
    }

}

function runHelp() {
    // TODO: Replace this with actual help menu for cat command
    return "HELP";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;