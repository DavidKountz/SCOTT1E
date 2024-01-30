const fs = require("fs");

async function runSelf(args) {
    let output = '';

    let file = args.split(" ")[0];

    file = file.replaceAll("..", "");

    if (args.trim().length < 1) {
        return "ERR_ARGS";
    }

    try {
        output = await new Promise ((resolve, reject) => {
            fs.readFile(file, 'utf8', (err, data) => {
                // if (err) throw err;
                output = data;
                resolve(output);
            });
        });
    } catch (error) {
        console.error('Error reading the file:', error);
        output = "The given file does not exist.";
    }

    console.log(output);
    return output;

}

function runHelp() {
    return "Prints to terminal the given file. Currently performs no additional actions, and '..' is unsupported.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;