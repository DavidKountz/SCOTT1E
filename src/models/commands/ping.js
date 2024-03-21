const exec = require("child_process").exec;

// There's a high chance having a true
// ping is very unwise, as it needlessly adds to bandwidth,
// serves almost no purpose other than being a gimmick,
// and may introduce vulnerabilities.
// nevertheless, for our purposes (testing and making a moderate
// product, it suffices for the time being.
async function runSelf(args) {
    let output = "";
    let hostname = String(args.split(" ")[0]);
    if (hostname.includes("'") || hostname.includes('"')) {
        output += "The hostname is not allowed to contain quotations.";
        hostname = hostname.replace("'", "");
        hostname = hostname.replace('"', "");
        // just to be absolutely sure that there cannot be code injections
        return output;
    }
    
    if (hostname.includes("192.168.") || hostname.includes("172.") || hostname.includes("10.")) {
        output += "The hostname is not allowed to contain the numbers you gave. Please attempt to ping a different host.";
        hostname = hostname.replace("172.", "");
        hostname = hostname.replace("10.", "");
        hostname = hostname.replace("192.168.", "");
        // just to be absolutely sure that there cannot be code injections
        return output;
    }

    output = await new Promise((resolve, reject) => {
        let pingCmd = "ping ";
        // check if the host platform is Linux prior to adding the count flag
        // as the Windows and Linux counts differ. This creates a relatively
        // uniform output regardless of server OS.
        if (process.platform.includes("linux")) {
            pingCmd += '-c 4 "';
        } else { pingCmd += '"'}

        exec(pingCmd + hostname + '"', (err, stdout, stderr) => {
            output = output.concat(stdout, "\n");
            console.log("out: " + stdout, "err: " + err, "stderr: " + stderr);
            // the output prints nothing if the hostname doesn't exist and the host is Linux
            if (process.platform.includes("linux")) {
                output += stderr;
            }
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