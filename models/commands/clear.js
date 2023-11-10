function runSelf(args) {
    let output = 'CLEAR [IN-DEV]';
    if (!args) {
        return "ERR_ARGS";
    }
    return output;
}

function runHelp() {
    return "Clears the screen.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;