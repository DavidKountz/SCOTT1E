function runSelf(args) {
    let output = 'This will output and be formatted. This is clay.';
    if (!args) {
        return "ERR_ARGS";
    }
    return output;
}

function runHelp() {
    return "A test message for displaying correct formatting and autocompletion.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;