const fs = require("fs");

function runSelf(args) {
    let output = 'THIS IS A SAMPLE CAT';


    if (args.trim().length < 1) {
        return "ERR_ARGS";
    }

    async function readFile(filePath) {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            return data;
        } catch (error) {
            console.error('Error reading the file:', error);
            return null;
        }
    }

    return output;

}

function runHelp() {
    return "Prints to terminal the file given.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;