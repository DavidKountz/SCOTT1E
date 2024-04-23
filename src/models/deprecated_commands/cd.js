const fs = require("fs");
const publicFacingFolder = require("../commandMain").publicDir;

async function runSelf(args, dir) {
    let output = "";
    let error = false;
    let documents = [];
    let options = [];

    if (dir === "~") {
        dir = publicFacingFolder;
    }

    if (args.trim().length >= 1) {
        fs.stat(args, (err, stats) => {
            if (err) {
                error = true;
            }
        });

        dir = args;
    }

    // if there are no arguments, print the output in this directory
    try {
        if (1) {
            output = await new Promise((resolve, reject) => {
                let msg = "The given file or folder does not exist.";

                fs.readdir(dir, (err, files) => {
                    if (err) {
                        console.log("Unable to scan dir. Err: " + err);
                        reject(err);
                    }

                    if (!error) {
                        try {
                            files.forEach((file) => {
                                if (error) {
                                    resolve(output);
                                }
                                documents.push(file);
                            });
                        } catch {
                            //nothing
                        }

                        for (let i = 0; i < documents.length; i++) {
                            console.log(documents[i]);
                            let doc = documents[i];
                            fs.stat(doc, (err, stats) => {
                                if (stats) {
                                    console.log(`${doc} : ${Object.values(stats)}`);
                                }
                            });
                        }

                    } else {
                        output = msg;
                    }
                });
            });
        }
    } catch (e) {
        console.log("The given item is not a folder.");
        //nothing
        //this is because the error isn't
        // as important as conveying to the user
        // that the file doesn't exist.
        // we don't want the server to crash just because of a faulty command.
    }

    return output;
}

function runHelp() {
    return "Changes directories to the given folder.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;