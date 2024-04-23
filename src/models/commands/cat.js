// const fs = require("fs");
// const publicFacingFolder = require("../commandMain").publicDir;
const read = require("./read");

async function runSelf(args) {
    /*
    let output = '';

    let file = args.split(" ")[0];

    file = publicFacingFolder + file.replaceAll("..", "");

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
    */

    // swapping out cat to
    return read.runSelf(args);

}

function runHelp() {
    // previous output:
    // "Prints to terminal the given file. Currently, performs no additional actions, and '..' is unsupported. This will render HTML files."
    return `Prints to terminal the given article. Alias for "read".`;
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;