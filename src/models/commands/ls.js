// const fs = require("fs");
// const publicFacingFolder = require("../commandMain").publicDir;
const articles = require("./articles");

async function runSelf(args, dir) {
    /*
    let output = "";
    let error = false;

    console.log(`args: ${args}\ndir: ${dir}`);

    // if no folder is delivered to the api as the cwd (current working directory)
    // then use the public one
    if (dir === "~") {
        dir = publicFacingFolder;
    }

    if (args.includes("..")) {
        args = args.replaceAll("..", "");
    }

    // the argument for ls, which is INDEPENDENT of the cwd
    // that is, the cwd is what happens if you run "ls" itself
    // the args is what's ran if you run something like "ls my_folder/"
    if (args.trim().length >= 1) {
        fs.stat(args, (err, stats) => {
            if (err) {
                error = true;
            }
        });

        dir = publicFacingFolder + args;
    }

    // if the user tries to exit publicFacingFolder, put em back in, the landlubbers
    if (!(dir.includes(publicFacingFolder))) {
        dir = publicFacingFolder + dir;
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
                            files.forEach((file, index) => {
                                if (error) {
                                    resolve(output);
                                }
                                output += (file);
                                if (index + 1 === files.length) {
                                    resolve(output);
                                }
                                output += "\n";
                            });
                        } catch {
                            //nothing
                        }
                    } else {
                        output = msg;
                    }
                });
            });
        }
    } catch (e) {
        //nothing
        //this is because the error isn't
        // as important as conveying to the user
        // that the file doesn't exist.
        // we don't want the server to crash just because of a faulty command.
    }
    */

    // in this case, performing the same actions as articles.js
    // however I want it to dymanically update in the event I change articles.js
    // gave me some headache pfff
    return articles.runSelf("pain");
}

function runHelp() {
    // original function:
    // "Prints the files in the current directory to the terminal. The '..' functionality is not supported."
    return `Lists available articles. Alias for "articles".`;
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;