function runSelf(args) {
    let output = `[READ]`;
    return output;
}

function runHelp() {
    return "Lets you read an article. Pass the title as the argument.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;