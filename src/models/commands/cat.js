function runSelf(args) {
    let output = 'THIS IS A SAMPLE CAT';
    if (!args) {
        return "ERR_ARGS";
    }

    return output;

}

function runHelp() {
    return "Prints to terminal the file given.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;