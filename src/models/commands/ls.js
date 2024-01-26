const fs = require("fs");

async function runSelf(args, dir) {
    let output = "";
    let error = false;

    console.log(`args: ${args}\ndir: ${dir}`);

    // if no folder is delivered to the api as the cwd (current working directory)
    // then use the public one
    if (dir === "~") {
        dir = "public/";
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

        dir = "public/" + args;
    }

    // if the user tries to exit "public/", put em back in, the landlubbers
    if (!(dir.includes("public/"))) {
        dir = "public/" + dir;
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

    return output;
}

function runHelp() {
    return "Prints the files in the current directory to the terminal. The '..' function is not supported.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;