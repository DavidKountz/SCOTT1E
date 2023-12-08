const fs = require("fs");

async function runSelf(args) {
    let output = '';

    let file = args.split(" ")[0];

    if (args.trim().length < 1) {
        return "ERR_ARGS";
    }

    try {
        output = await new Promise ((resolve, reject) => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) throw err;
                output = data;
                resolve(output);
            });
        });
    } catch (error) {
        console.error('Error reading the file:', error);
    }

    return output;

}

function runHelp() {
    return "Prints to terminal the file given. Currently performs no additional actions.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;