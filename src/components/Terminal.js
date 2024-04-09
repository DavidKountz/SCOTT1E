import React, { useEffect } from 'react';
import "./Terminal.css";
import {theme} from "antd";

const HOSTNAME = "localhost";//"3.19.229.228";

function Home() {

    useEffect(() => {
        // commands and their history and information
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

        document.body.classList.add('cli-body');

        const PORT = 3001;

        // --------------- herein lies the theme-changing code

        const curTheme = localStorage.getItem("curTheme");

        // these are the terminal color options
        let colors = {
            "frog": {
                "--font": "Nokia-3410",
                "--text-color": "#183D3D",
                "--background-color": "#93B1A6",
                "--terminal-color-primary": "#183D3D",
                "--terminal-color-accent": "#5C8374",
            },
            "seafoam": {
                "--font": "Nokia-3410",
                "--text-color": "#6499E9",
                "--background-color": "#BEFFF7",
                "--terminal-color-primary": "#6499E9",
                "--terminal-color-accent": "#9EDDFF",
            },
            "sakura": {
                "--font": "Nokia-3410",
                "--text-color": "#BB9CC0",
                "--background-color": "#FED9ED",
                "--terminal-color-primary": "#67729D",
                "--terminal-color-accent": "#fffcf3",
            },
            "beach": {
                "--font": "Nokia-3410",
                "--text-color": "#0C356A",
                "--background-color": "#FFF6E0",
                "--terminal-color-primary": "#0174BE",
                "--terminal-color-accent": "#61677A",
            },
            "moonrock": {
                "--font": "Nokia-3410",
                "--text-color": "#A6A7AA",
                "--background-color": "#32312e",
                "--terminal-color-primary": "#748ca3",
                "--terminal-color-accent": "#dae0e0",
            },
            // to be replaced with the contents of moonrock
            "default": {},
        };

        // setting the default color scheme to Moonrock
        colors["default"] = colors["moonrock"];

        // special thanks to the web for this one:
        // this enables me to grab every element and find the ones using specific CSS vars.
        // getting all elements to iterate through
        // empty lists to append to
        /*
        const elementsWithTextVar = [];
        const elementsWithBackgroundVar = [];
        const elementsWithPrimaryVar = [];
        const elementsWithAccentVar = [];

        function updateElementLists() {
            let allElements = document.querySelectorAll("*");

            allElements.forEach((element) => {
                const computedStyle = window.getComputedStyle(element);
                const textColor = computedStyle.getPropertyValue('--text-color');
                if (textColor) {
                    elementsWithTextVar.push([element, textColor]);
                }
            });

            allElements.forEach((element) => {
                const computedStyle = window.getComputedStyle(element);
                const backgroundColor = computedStyle.getPropertyValue('--background-color');
                if (backgroundColor) {
                    elementsWithBackgroundVar.push([element, backgroundColor]);
                }
            });
            console.log(elementsWithBackgroundVar.length);

            // updating this list to run through it again
            // this basically selects the ONLY elements with the "steel"
            // class. Steel means the accent color.
            // working smarter, not harder.

            document.querySelectorAll('.steel').forEach((element) => {
                let accentColor = window.getComputedStyle(element).color;
                elementsWithAccentVar.push([element, accentColor]);
            });

            document.querySelectorAll('.green').forEach((element) => {
                let primaryColor = window.getComputedStyle(element).color;
                elementsWithPrimaryVar.push([element, primaryColor]);
            });
        }

        // initial updating of each list
        updateElementLists(); */

        // these should be done instantly
        // if the current theme is not in colors
        if (!(curTheme in colors)) {
            localStorage.setItem("curTheme", "default");
            changeToThemeInstant("default");
        }
        // if not the default theme, change to it
        else if (curTheme !== "default") {
            // it's a special case since they're reloading
            // and/or reopening the page.
            changeToThemeInstant(curTheme, true);
        }

        function needToChangeTheme(currentTheme) {
            // if the theme already is selected
            // and if it's not a special case, return
            if (localStorage.getItem("curTheme") === currentTheme) {
                console.log(`${currentTheme} theme is selected, curTheme is ${localStorage.getItem('curTheme')}\nWill not change the theme.`);
                return true;
            }
            return false;
        }

        // instantly changes the theme without animating.
        // Useful if reloading or something
        function changeToThemeInstant(theme, specialCase = false) {
            // if the theme already is selected
            // and if it's not a special case, return
            if (needToChangeTheme(theme) && !specialCase) {
                // nothing should be done
                return;
            }

            // there should only ever be one
            let variableContainer = document.body;

            // for each attribute in the given theme
            // set their values. Works like a charm
            for (let i in colors[theme]) {
                variableContainer.style.setProperty(i, colors[theme][i]);
            }

            localStorage.setItem("curTheme", theme);
        }

        // *wicked* cool.
        // same as changeToThemeInstant but animated
        function changeToThemeAnimated(theme, specialCase = false) {
            // if the theme already is selected
            // and if it's not a special case, return
            if (needToChangeTheme(theme) && !specialCase) {
                // nothing should be done
                return;
            }

            let variableContainer = document.body;
            let currentColors = [];
            // the colors in the theme
            // should be the same length as currentColors
            let themeColors = [];

            // grabbing the colors from the current theme
            // and ONLY the colors.
            for (let i in colors[localStorage.getItem("curTheme")]) {
                if (i.includes("color")) {
                    currentColors.push([i, colors[theme][i]]);
                }
            }

            for (let i in colors[theme]) {
                if (i.includes("color")) {
                    themeColors.push(colors[theme][i]);
                }
            }

            for (let i in currentColors) {
                animateColorChange(variableContainer, themeColors[i], currentColors[i][0], currentColors[i][1]);
            }

            localStorage.setItem("curTheme", theme);
        }

        // changes the theme colors to the chosen theme
        // for each element variable
        /*
        function changeToTheme(theme, specialCase = false) {
            // if the theme already is selected
            // and if it's not a special case, return
            if (localStorage.getItem("curTheme") === theme && !specialCase) {
                console.log(`${theme} theme is selected, curTheme is ${localStorage.getItem('curTheme')}\nWill not change the theme.`);
                return
            }

            elementsWithTextVar.forEach((tempElItem) => {
                changeThemeColors(tempElItem, colors[theme]["--text-color"], "color");
            });
            elementsWithBackgroundVar.forEach((tempElItem) => {
                changeThemeColors(tempElItem, colors[theme]["--background-color"], "background-color");
            });
            elementsWithPrimaryVar.forEach((tempElItem) => {
                changeThemeColors(tempElItem, colors[theme]["--terminal-color-primary"], "color");
            });
            elementsWithAccentVar.forEach((tempElItem) => {
                changeThemeColors(tempElItem, colors[theme]["--terminal-color-accent"], "color");
            });

            // update element lists to accurately reflect the new colors
            updateElementLists();
            localStorage.setItem("curTheme", theme);
        }
        */

        function hexToRgb(hex) {
            // special thanks to:
            // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        function animateColorChange(cssVariableElement, themeColor, attributeName, startColor) {
            // let startColor = cssVariableElement;
            let endColorRGB;
            let startColorRGB;

            // basically, if
            if (startColor.length === 7) {
                startColorRGB = hexToRgb(startColor);
            } else {
                startColorRGB = startColor;
            }

            if (themeColor.length === 7) {
                endColorRGB = hexToRgb(themeColor);
            } else {
                endColorRGB = themeColor;
            }

            // animation duration in milliseconds
            const animDuration = 3000;
            let startTime;
            let animationFrame;

            function animateColor(timestamp) {
                if (!startTime) startTime = timestamp;
                // the time elapsed; the difference between startTime and now
                const elapsed = timestamp - startTime;
                // the progress in a percentage of the animationDuration
                // taking the minimum so that it never exceeds the desired color
                const progress = Math.min(elapsed / animDuration, 1);

                // calculating the intermediate color
                // red = 1 - current progress (so the remaining "progress" to 1, if you will)
                // (for example, if current progress is 1/10, then the number would be 1 - 1/10 = 9/10)
                // times the integer value of the red beforehand PLUS the 1/5000 of endColor

                // sample color #FFFFFF
                const r = Math.round((1 - progress) * startColorRGB.r + progress * endColorRGB.r);
                const g = Math.round((1 - progress) * startColorRGB.g + progress * endColorRGB.g);
                const b = Math.round((1 - progress) * startColorRGB.b + progress * endColorRGB.b);

                // setting it to the intermediate values
                cssVariableElement.style.setProperty(attributeName, `rgb(${r}, ${g}, ${b})`);

                // recursively calls animateColor to progressively animate the color
                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animateColor);
                }
                // } else {
                //     cssVariableElement.style.setProperty(attributeName, themeColor);
                // }
            }

            // starting the animation
            animationFrame = requestAnimationFrame(animateColor);
        }

        // this function changes to the theme selected. Uses:
        // the element/startColor pair, theme color, and CSS attribute to change
        function changeThemeColors(elList, themeColor, cssStyle) {
            let elementToChange = elList[0];
            let startColor = elList[1];
            let endColorRGB = hexToRgb(themeColor);
            let startColorRGB;

            // basically, if
            if (startColor.length === 7) {
                startColorRGB = hexToRgb(startColor);
            } else {
                startColorRGB = startColor;
            }

            // animation duration in milliseconds
            const animDuration = 1500;
            let startTime;
            let animationFrame;

            // this is a SUPER epic JS moment
            // basically, I can change the style of the given
            // CSS style just by treating it like an object
            // and passing the style through as a key.
            elementToChange.style[cssStyle] = startColor;

            function animateColor(timestamp) {
                if (!startTime) startTime = timestamp;
                // the time elapsed; the difference between startTime and now
                const elapsed = timestamp - startTime;
                // the progress in a percentage of the animationDuration
                // taking the minimum so that it never exceeds the desired color
                const progress = Math.min(elapsed / animDuration, 1);

                // calculating the intermediate color
                // red = 1 - current progress (so the remaining "progress" to 1, if you will)
                // (for example, if current progress is 1/10, then the number would be 1 - 1/10 = 9/10)
                // times the integer value of the red beforehand PLUS the 1/5000 of endColor

                // sample color #FFFFFF
                const r = Math.round((1 - progress) * startColorRGB.r + progress * endColorRGB.r);
                const g = Math.round((1 - progress) * startColorRGB.g + progress * endColorRGB.g);
                const b = Math.round((1 - progress) * startColorRGB.b + progress * endColorRGB.b);

                // setting it to the intermediate values
                elementToChange.style[cssStyle] = `rgb(${r}, ${g}, ${b})`;

                // recursively calls animateColor to progressively animate the color
                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animateColor);
                } else {
                    elementToChange.style[cssStyle] = themeColor;
                }
            }

            // starting the animation
            animationFrame = requestAnimationFrame(animateColor);
        }


        // -------------- thus ends the theme-changing code

        // gets a list of currently supported commands upon website load
        let commands;
        try {
            getCommands();
        } catch {
            cli.value = "The server cannot be reached. Please refresh.";
        }

        let articleData;
        /*
        For my reference, the article fields are:

        article_id: 1,
        title: 'Test 1',
        author: 'Author One',
        article_content: 'Lorem Ipsum blah blah blah .',
        views: 42,
        image: null
         */
        try {
            getArticles();
        } catch {
            cli.value = "The server cannot be reached. Please refresh.";
        }

        // manages key presses
        function keyPressListener(keypress) {
            cli.value = cli.value.replaceAll("\n", "");

            if (keypress.key === "Enter") {
                keypress.preventDefault();
                console.log(`${keypress.key} was pressed, ${cli.value} is the current "command"`);
                interactWithServer(cli.value, dir)
                cli.value = "";
            } else if (keypress.key === "ArrowRight" || keypress.key === "Tab") {
                keypress.preventDefault();
                let autocomplete = [];
                let commandRan = document.createElement("span");

                let cmdRan = "";

                let nothing = cli.value === "";
                // check and see if the current command matches any possible command
                // if so, appends that command to the autocomplete list
                if (!nothing) cmdRan = cli.value.split(" ")[0];

                // autocompleting commands
                for (let i = 0; i < commands.length; i++) {
                    if (nothing) break;
                    if (commands[i].startsWith(cli.value)) {
                        autocomplete.push(commands[i]);
                    }
                }

                // autocompleting articles
                for (let i = 0; i < articleData.length; i++) {
                    if (nothing) break;
                    if (articleData[i]["title"].startsWith(cli.value.replace("read ", ""))) {
                        autocomplete.push(articleData[i]["title"]);
                    }
                }

                cli.focus();

                // if autocomplete has only one element, fill that in
                if (autocomplete.length === 1) {
                    cli.value = autocomplete[0];
                    commandRan.setAttribute("class", cmdRan + " previousCommand"); // appending "previousCommand for consistency
                } else if (autocomplete.length >= 2) { // otherwise, list all available options
                    commandRan.setAttribute("class", cmdRan + " previousCommand"); // appending "previousCommand for consistency
                    commandRan.innerText = autocomplete.toString().replaceAll(",", ", ");
                    commandRan.innerHTML = cli.value + "<br>" + commandRan.innerHTML + "<br>";
                    autofill.appendChild(commandRan);
                    // commandRan.innerHTML = "<br>" + commandRan.innerHTML;
                    history.innerHTML += autofill.innerHTML;
                    autofill.removeChild(commandRan);

                    // scrolling to the last command
                    let historyItems = document.getElementsByClassName("previousCommand");
                    let lastItem = historyItems[historyItems.length - 1];
                    if (lastItem !== undefined) {
                        lastItem.scrollIntoView({behavior: "smooth"});
                    }
                }
            }
            cli.value = cli.value.replaceAll("\n", "");
        }

        cli.addEventListener("keydown", keyPressListener);

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

        function getArticles() {
            /*
            This function grabs all article data including but not limited to:
            Title
            Author name
            Views
            Article content
             */
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState != 4) return;

                if (this.status == 200) {
                    articleData = JSON.parse(this.responseText);
                    console.log(`Articles obtained: ${articleData}`);
                }
            };

            xhr.open("GET", `http://${HOSTNAME}:${PORT}/commands/articles`, true)
            xhr.send();
        }

        function interactWithServer(cmd, directory) {
            // cmd = JSON.stringify(cmd);
            // console.log(cmd);
            let xhr = new XMLHttpRequest();
            let cmdSplit = cmd.split(" ");
            let command = cmdSplit[0];
            let args = cmd.replace(command, "").trim();
            let fullArgs = args;
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

                        let removeThis = `<p class="terminal-output">`;

                        // SPECIAL COMMANDS THAT REQUIRE CLIENT-SIDE INTERPRETATION ^ and v
                        if (String(formattedData["output"]).includes(removeThis + "[CLEAR]</p>")) {
                            history.innerHTML = "";
                        } else if (String(formattedData["output"]).includes(removeThis + "[ARTICLES]</p>")) {
                            let articleInfo = "<br><br>";
                            for (let i = 0; i < articleData.length; i++) {
                                articleInfo += articleData[i]["title"] + "<br>";
                                articleInfo += articleData[i]["author"] + "<br>";
                                articleInfo += "<br>";
                            }

                            let tempcmdsHis = formattedData["output"].replace(removeThis + "[ARTICLES]</p>", articleInfo);
                            history.innerHTML = history.innerHTML + tempcmdsHis;

                        }
                        // NOTE: This is slightly different from the rest given it needs an argument
                        // BUT still also needs to be done client-side since the client is already storing
                        // all data about articles
                        else if (String(formattedData["output"]).includes(removeThis + "[READ]</p>")) {
                            let articleText = "<br><br>";
                            for (let i = 0; i < articleData.length; i++) {
                                // if the title is in the articles
                                if (fullArgs.includes(articleData[i]["title"])) {
                                    articleText += articleData[i]["title"] + "<br>";
                                    articleText += articleData[i]["author"] + "<br><br>";
                                    articleText += articleData[i]["article_content"] + "<br>";
                                    articleText += "<br>";
                                }
                            }

                            if (articleText === "<br><br>") {
                                articleText = "<br><br>No articles found with that title.<br><br>";
                            }

                            let tempcmdsHis = formattedData["output"].replace(removeThis + "[READ]</p>", articleText);
                            history.innerHTML = history.innerHTML + tempcmdsHis;

                        } else if (String(formattedData["output"]).includes(removeThis + "[LIST]</p>")) {
                            let tempcmds = "<br>";

                            for (let i = 0; i < commands.length; i++) {
                                tempcmds += commands[i] + "<br>";
                            }
                            let tempcmdsHis = formattedData["output"].replace(removeThis + "[LIST]</p>", tempcmds);

                            history.innerHTML = history.innerHTML + tempcmdsHis;
                        } else if (String(formattedData["output"]).includes(removeThis + "[THEMES]</p>")) {
                            let themeOptions = "<br>";
                            for (let i in colors) {
                                themeOptions += i + "<br>";
                            }

                            console.log(themeOptions);

                            let themeOptionsHis = formattedData["output"].replace(removeThis + "[THEMES]</p>", themeOptions);

                            history.innerHTML = history.innerHTML + themeOptionsHis;
                        } else if (String(formattedData["output"]).includes(removeThis + "[THEME]</p>")) {
                            let themeOptions = `<br>Theme changed to ${cmdSplit[1]}<br>`;
                            if (cmdSplit[1] in colors) {
                                changeToThemeAnimated(cmdSplit[1]);
                            } else {
                                console.log(cmdSplit[1]);
                                themeOptions = "<br>That theme does not exist. Pleas try again.<br>"
                            }

                            console.log(themeOptions);

                            let themeOptionsHis = formattedData["output"].replace(removeThis + "[THEME]</p>", themeOptions);

                            history.innerHTML = history.innerHTML + themeOptionsHis;
                        }

                        else {
                            console.log(formattedData["output"]);
                            history.innerHTML = history.innerHTML + formattedData["output"];//.replaceAll("\\n", "\n").replaceAll('\\"', '\"');
                        }

                        let previousCommands = document.getElementsByClassName("previousCommand");
                        let lastCommand = previousCommands[previousCommands.length - 1];
                        lastCommand.scrollIntoView({ behavior: "smooth"});

                    } catch (error) {
                        console.error("An error occurred while parsing the JSON: " + error);
                    }
                    // PERFORM AN ACTION WITH THIS - e.g. append it to history, change url to match directory
                    // ... run an Easter egg, stuff like that.
                }
            };

            // TODO: add Disqus username support
            xhr.open("GET", `http://${HOSTNAME}:${PORT}/commands/${directory}/${command}/${args}/${username}`, true);
            xhr.send();
        }
    }, []);

    return (
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
                <textarea id="cliInterface" spellCheck="false" autoFocus={true}></textarea>
            </div>
        </div>
    );
}

export default Home;
