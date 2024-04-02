import React, { useEffect } from 'react';
import "./Terminal.css";

const HOSTNAME = "localhost";//"3.19.229.228";

function Home() {

    useEffect(() => {

        const history = document.getElementById("history");
        const cli = document.getElementById("cliInterface");
        const username = "guest",
            dir = "~";

        const usernameElem = document.createElement("span"),
            dirElem = document.createElement("span");
        usernameElem.className = "green";
        usernameElem.innerText = `${username}@scott1e.com`
        dirElem.className = "steel";
        dirElem.innerText = `${dir}`;

        const info = document.createElement("span");
        info.setAttribute("class", "user");
        info.appendChild(usernameElem);
        info.innerHTML = info.innerHTML + ":";
        info.appendChild(dirElem);
        info.innerHTML = info.innerHTML + "$";
        let autofill = document.createElement("section");
        autofill.setAttribute("class", "previousCommand");
        autofill.appendChild(info);

        const PORT = 3001;

        document.body.classList.add('beach-theme');



// gets a list of currently supported commands upon website load
        let commands;
        try {
            getCommands();
        } catch {
        cli.value = "The server cannot be reached. Please refresh.";
        }

// prevents tab from selecting other elements on accident
        window.addEventListener('keydown', function (event) {
            if (event.key === "Tab") {
                // prevent default behaviour
                event.preventDefault();
                return false;
            }

            cli.value = cli.value.replaceAll("\n", "");
        });


// manages key presses via keyup
        cli.addEventListener("keyup", (keypress) => {
            let autocomplete = [];

            let commandRan = document.createElement("span");

            if (keypress.key === "Enter") {
                console.log(`${keypress.key} was pressed, ${cli.value} is the current "command"`);
                sendRequest(cli.value, dir)
                cli.value = "";
            }

            // if the keys TAB or right arrow are pressed...
            if (keypress.key === "Tab" || keypress.key === "ArrowRight") {
                let nothing = cli.value === "";
                // check and see if the current command matches any possible command
                // if so, appends that command to the autocomplete list
                for (let i = 0; i < commands.length; i++) {
                    if (nothing) break;
                    if (commands[i].startsWith(cli.value)) {
                        autocomplete.push(commands[i]);
                    }
                }
                cli.focus();

                // if autocomplete has only one element, fill that in
                if (autocomplete.length === 1) {
                    cli.value = autocomplete[0];
                    commandRan.setAttribute("class", cli.value);
                } else if (autocomplete.length >= 2) { // otherwise, list all available options
                    commandRan.setAttribute("class", cli.value);
                    commandRan.innerText = autocomplete.toString().replaceAll(",", ", ");
                    commandRan.innerHTML = "<br>" + commandRan.innerHTML;
                    let temp = autofill;
                    autofill.appendChild(commandRan);
                    history.appendChild(autofill);
                }
            }

            cli.value = cli.value.replaceAll("\n", "");
        });

        function getCommands() {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState != 4) return;

                if (this.status == 200) {
                    commands = JSON.parse(this.responseText)["commands"];
                    console.log(commands);
                    // PERFORM AN ACTION WITH THIS - e.g. append it to history, change url to match directory
                    // ... run an Easter egg, stuff like that.
                }
            };

            xhr.open("GET", `http://${HOSTNAME}:${PORT}/commands`, true)
            xhr.send();
        }

        function sendRequest(cmd, directory) {
            // cmd = JSON.stringify(cmd);
            // console.log(cmd);
            let xhr = new XMLHttpRequest();
            let cmdSplit = cmd.split(" ");
            let command = cmdSplit[0];
            let args = cmd.replace(command, "").trim();
            args = JSON.stringify(args);
            args = encodeURIComponent(args);
            console.log(args);

            xhr.onreadystatechange = function () {
                if (this.readyState != 4) return;

                if (this.status == 200) {
                    let data = this.responseText;
                    try {
                        let formattedData = JSON.parse(data);
                        console.log(formattedData);
                        formattedData = JSON.parse(formattedData);

                        if (formattedData["output"] === "ADMIN") {
                            document.location.href = `http://${HOSTNAME}:3000/AdminLogin`;
                        }

                        // SPECIAL COMMANDS THAT REQUIRE CLIENT-SIDE INTERPRETATION
                        if (String(formattedData["output"]).includes("<p>[CLEAR]</p>")) {
                            history.innerHTML = "";
                        } else if (String(formattedData["output"]).includes("<p>[LIST]</p>")) {
                            let tempcmds = "";

                            for (let i = 0; i < commands.length; i++) {
                                // TODO: replace hard-coded guest with Disqus user

                                tempcmds += commands[i] + "<br>";
                            }

                            let tempcmdsHis = `
        <section class="previousCommand">
            <span class="user"><span class="green">guest@scott1e.com</span>:<span class="steel">~</span>$</span>
            <span class="echo">${cmd}</span>
            <p>${tempcmds}</p>
        </section>`;

                            history.innerHTML = history.innerHTML + tempcmdsHis;
                        }

                        else {
                            console.log(formattedData["output"]);
                            history.innerHTML = history.innerHTML + formattedData["output"];//.replaceAll("\\n", "\n").replaceAll('\\"', '\"');
                        }

                        let eles = document.getElementsByClassName("previousCommand");
                        let ele = eles[eles.length - 1];
                        ele.scrollIntoView({ behavior: "smooth"});

                    } catch (error) {
                        console.error("An error occurred while parsing the JSON: " + error);
                    }
                    // PERFORM AN ACTION WITH THIS - e.g. append it to history, change url to match directory
                    // ... run an Easter egg, stuff like that.
                }
            };

            // TODO: add Disqus username support
            xhr.open("GET", `http://${HOSTNAME}:${PORT}/commands/${directory}/${command}/${args}/${username}`, true)
            xhr.send();
        }
    }, []);

    return (
        <div className="everything">
            <div className="site">
                <div className="history" id="history">
                    {/* this will contain previous commands and their responses */}
                </div>
                <div id="cli">
            <span className="user">
              <span className="green">guest@scott1e.com</span>:
              <span className="steel">~</span>$
            </span>
                    <label htmlFor="cliInterface"></label>
                    <textarea id="cliInterface" spellCheck="false" autoFocus></textarea>
                </div>
            </div>
        </div>
    );
}

export default Home;
