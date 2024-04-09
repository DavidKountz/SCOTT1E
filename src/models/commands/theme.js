function runSelf(args) {
    let output = '[THEME]';
    return output;
}

function runHelp() {
    return "Changes the theme to the first argument given. Ignores other arguments.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;