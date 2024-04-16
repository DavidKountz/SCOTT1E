function runSelf(args) {
    let output = '[VIEW]';
    return output;
}

function runHelp() {
    return "Directs you to an article of your choosing. Your command history will not be saved.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;