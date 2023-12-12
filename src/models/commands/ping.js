const exec = require("child_process").exec;

// There's a high chance having a true
// ping is very unwise, as it needlessly adds to bandwidth,
// serves almost no purpose other than being a gimmick,
// and may introduce vulnerabilities.
// nevertheless, for our purposes (testing and making a moderate
// product, it suffices for the time being.
async function runSelf(args) {
    let output = "";
    let hostname = args.split(" ")[0];

    output = await new Promise((resolve, reject) => {
        exec("ping " + hostname, (err, stdout, stderr) => {
            output = output.concat(stdout, "\n");
            console.log(stdout);
            resolve(output);
        });
    });
    return output;
}

function runHelp() {
    return "Pings the given host 4 times.";
}

module.exports.runSelf = runSelf;
module.exports.runHelp = runHelp;