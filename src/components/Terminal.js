import React, { useEffect } from 'react';
import "./Terminal.css";
import {theme} from "antd";

import {globalvals} from "../variables";

function Home() {

    // TODO: add fonts/font size with themes
    // TODO: add article redirection with command (such as "view")

    // completed both B)

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

        // the list of commands in the future and past
        // as in when you press the up and down arrows
        // to navigate to past commands
        const previousCommandsList = [];
        const futureCommandsList = [];

        const protocol = "http";
        const PORT = 3001;

        // --------------- herein lies the theme-changing code

        const curTheme = localStorage.getItem("curTheme");

        // these are the terminal color options
        let colors = {
            "frog": {
                "--font": "Nokia-3410",
                "--text-color": "#689c49",
                "--background-color": "#183d1a",
                "--terminal-color-primary": "#477031",
                "--terminal-color-accent": "#5d7c38",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "rose": {
                "--font": "Nokia-3410",
                "--text-color": "#7e3232",
                "--background-color": "#e46c6c",
                "--terminal-color-primary": "#ffbebe",
                "--terminal-color-accent": "#835c5c",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "tron": {
                "--font": "Nokia-3410",
                "--text-color": "#00ffa2",
                "--background-color": "#001515",
                "--terminal-color-primary": "#00ffff",
                "--terminal-color-accent": "#00ff9c",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "canyon": {
                "--font": "Nokia-3410",
                "--text-color": "#c38868",
                "--background-color": "#4e3440",
                "--terminal-color-primary": "#fdd46e",
                "--terminal-color-accent": "#7d0b1b",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "candy": {
                "--font": "Nokia-3410",
                "--text-color": "#4785ff",
                "--background-color": "#ffe163",
                "--terminal-color-primary": "#ff5151",
                "--terminal-color-accent": "#88ff6b",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "sandstone": {
                "--font": "Nokia-3410",
                "--text-color": "#918a6c",
                "--background-color": "#d5d09b",
                "--terminal-color-primary": "#7c732c",
                "--terminal-color-accent": "#837d5c",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },

            // Above need to be updated

            "mint": {
                "--font": "Nokia-3410",
                "--text-color": "#183D3D",
                "--background-color": "#93B1A6",
                "--terminal-color-primary": "#183D3D",
                "--terminal-color-accent": "#5C8374",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "frost": {
                "--font": "Nokia-3410",
                "--text-color": "#698ab6",
                "--background-color": "#c8e0ff",
                "--terminal-color-primary": "#90a0af",
                "--terminal-color-accent": "#ffffff",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "overcast": {
                "--font": "Nokia-3410",
                "--text-color": "#9db8c1",
                "--background-color": "#617283",
                "--terminal-color-primary": "#90a0af",
                "--terminal-color-accent": "#465b67",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "nebula": {
                "--font": "Nokia-3410",
                "--text-color": "#a450ff",
                "--background-color": "#180650",
                "--terminal-color-primary": "#812b7d",
                "--terminal-color-accent": "#ae6200",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "spruce": {
                "--font": "Nokia-3410",
                "--text-color": "#93B1A6",
                "--background-color": "#183D3D",
                "--terminal-color-primary": "#5C8374",
                "--terminal-color-accent": "#5e4924",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "chocolate": {
                "--font": "Nokia-3410",
                "--text-color": "#A9907E",
                "--background-color": "#3E3232",
                "--terminal-color-primary": "#5e4924",
                "--terminal-color-accent": "#5C8374",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "gravel": {
                "--font": "Nokia-3410",
                "--text-color": "#A6A7AA",
                "--background-color": "#575651",
                "--terminal-color-primary": "#2c2f2f",
                "--terminal-color-accent": "#dae0e0",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "coffee": {
                "--font": "Nokia-3410",
                "--text-color": "#3E3232",
                "--background-color": "#F1DEC9",
                "--terminal-color-primary": "#A9907E",
                "--terminal-color-accent": "#5f8285",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "gamer": {
                "--font": "aeys",
                "--text-color": "#de4e4e",
                "--background-color": "#08143a",
                "--terminal-color-primary": "#6de346",
                "--terminal-color-accent": "#dae0e0",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "terminal": {
                "--font": "QuinqueFive",
                "--text-color": "#6de346",
                "--background-color": "#000000",
                "--terminal-color-primary": "#6de346",
                "--terminal-color-accent": "#6de346",
                "--font-size": "15pt",
                "--cli-margin": "0.2%",
            },
            "powershell": {
                "--font": "ModeSeven",
                "--text-color": "#ffffff",
                "--background-color": "#020246",
                "--terminal-color-primary": "#ffffff",
                "--terminal-color-accent": "#f8edc3",
                "--font-size": "15pt",
                "--cli-margin": "0.3%",
            },
            "osx": {
                "--font": "ModeSeven",
                "--text-color": "#000000",
                "--background-color": "#ffffff",
                "--terminal-color-primary": "#111111",
                "--terminal-color-accent": "#222222",
                "--font-size": "15pt",
                "--cli-margin": "0.3%",
            },
            "dos": {
                "--font": "DOS",
                "--text-color": "#ffffff",
                "--background-color": "#000000",
                "--terminal-color-primary": "#ffffff",
                "--terminal-color-accent": "#eeeeee",
                "--font-size": "20pt",
                "--cli-margin": "0.1%",
            },
            "seafoam": {
                "--font": "Nokia-3410",
                "--text-color": "#6499E9",
                "--background-color": "#BEFFF7",
                "--terminal-color-primary": "#6499E9",
                "--terminal-color-accent": "#9EDDFF",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "sakura": {
                "--font": "Nokia-3410",
                "--text-color": "#BB9CC0", // alternatively, #a388a8
                "--background-color": "#FED9ED",
                "--terminal-color-primary": "#67729D",
                "--terminal-color-accent": "#fffcf3",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "beach": {
                "--font": "Nokia-3410",
                "--text-color": "#0C356A",
                "--background-color": "#FFF6E0",
                "--terminal-color-primary": "#0174BE",
                "--terminal-color-accent": "#61677A",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            "moonrock": {
                "--font": "Nokia-3410",
                "--text-color": "#A6A7AA",
                "--background-color": "#32312e",
                "--terminal-color-primary": "#748ca3",
                "--terminal-color-accent": "#dae0e0",
                "--font-size": "15pt",
                "--cli-margin": "0.1%",
            },
            // to be replaced with the contents of moonrock
            "default": {},
        };

        // setting the default color scheme to Moonrock
        colors["default"] = colors["moonrock"];

        // making a sorted list to print instead of the
        // object itself, as disorder was confusing in this
        // context in particular
        let colorsSorted = Object.keys(colors).sort();
        // source for this idea, although... I could've figured this much out pfff
        // https://stackoverflow.com/questions/1069666/sorting-object-property-by-values/37607084#37607084

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
        // same as above but animated
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
                } else {
                    // if it's not a color, and thus I don't want to animate it...
                    // change it immediately.
                    variableContainer.style.setProperty(i, colors[theme][i]);
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

        /*
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
        */


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

        // refocusing on text box if text is not selected
        function getSelectedText() {
            // special thanks to
            // https://stackoverflow.com/questions/4712310/javascript-how-to-detect-if-a-word-is-highlighted
            let text = "";
            if (typeof window.getSelection() !== undefined) {
                text = window.getSelection().toString();
            } else if (typeof document.selection != "undefined" && document.selection.type === "Text") {
                text = document.selection.createRange().text;
            }

            return text;
        }
        function redirectFocusIfNotSelecting() {
            let selectedText = getSelectedText();
            if (!selectedText) {
                cli.focus();
            }

            // calling this so that I don't need to write
            // document.onmouseup twice.
            updateCli();
        }

        document.onmouseup = redirectFocusIfNotSelecting;

        function updateCli() {
            // dynamically widens the cli box to the amount of characters.
            // This pairs very well with the automatic focusing on cli when
            // the mouse is released and no text is selected.
            // special thanks to:
            // https://stackoverflow.com/questions/3392493/adjust-width-of-input-field-to-its-input
            // if (cli.value.length > 2) {
            //     cli.style.width = (cli.value.length + 1) + "ch";
            // } else {
            //     // setting the minimum width to 5 characters to avoid
            //     // potential scrollbars appearing
            // }
            // cli.style.width = "90vw";

            // TODO: see why the width changing isn't reflecting correctly

            // very special thanks to
            // https://stackoverflow.com/questions/17772260/textarea-auto-height
            cli.style.height = cli.scrollHeight + "px";
        }

        // manages key presses
        function keyPressListener(keypress) {
            cli.value = cli.value.replaceAll("\n", "");

            updateCli();

            if (keypress.key === "Enter") {
                keypress.preventDefault();
                if (cli.value.length > 256) {
                    history.innerHTML = history.innerHTML + `<section class="previous-command">
            <span class="user"><span class="green">${username}@scott1e.com</span>:<span class="steel">${dir}</span>$</span>
            <span class="err">err len</span>
            <p class="terminal-output">The command provided was too long (over 256 characters) and thus cannot be processed.</p>
        </section>`;
                } else {
                    console.log(`${keypress.key} was pressed, "${cli.value}" is the current command`);
                    interactWithServer(cli.value, dir)
                }
                cli.value = "";
            } else if (keypress.key === "ArrowUp" && previousCommandsList.length > 0) {
                keypress.preventDefault();
                if (cli.value !== "") {
                    futureCommandsList.push(cli.value);
                }
                // push one "" to futureCommands if it's the last command
                if (cli.value === "" && futureCommandsList.length === 0) {
                    futureCommandsList.push(cli.value);
                }

                cli.value = previousCommandsList.pop();
            } else if (keypress.key === "ArrowDown" && futureCommandsList.length > 0) {
                keypress.preventDefault();
                if (cli.value !== "") {
                    previousCommandsList.push(cli.value);
                }
                cli.value = futureCommandsList.pop();
            } else if (keypress.key === "Tab") {
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
                }
            }
            cli.value = cli.value.replaceAll("\n", "");
        }

        cli.addEventListener("keydown", keyPressListener);

        function getCommands() {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;

                if (this.status === 200) {
                    commands = JSON.parse(this.responseText)["commands"];
                    console.log(`Debugging. Available commands: ${commands}`);
                    // PERFORM AN ACTION WITH THIS - e.g. append it to history, change url to match directory
                    // ... run an Easter egg, stuff like that.
                }
            };

            xhr.open("GET", `${protocol}://${globalvals.HOST}:${PORT}/commands`, true)
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
                if (this.readyState !== 4) return;

                if (this.status === 200) {
                    articleData = JSON.parse(this.responseText);
                    console.log(`Articles obtained: ${articleData}`);
                }
            };

            xhr.open("GET", `${protocol}://${globalvals.HOST}:${PORT}/commands/articles`, true)
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
            // console.log(args);

            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;

                if (this.status === 200) {
                    let data = this.responseText;
                    try {
                        let formattedData = JSON.parse(data);
                        // console.log(formattedData);
                        formattedData = JSON.parse(formattedData);

                        let specialCommands = [
                            "[CLEAR]",
                            "[ARTICLES]",
                            "[READ]",
                            "[LIST]",
                            "[THEMES]",
                            "[THEME]",
                        ];

                        if (formattedData["output"] === "ADMIN") {
                            document.location.href = `${protocol}://${globalvals.HOST}:3000/AdminLogin`;
                        }

                        // making a list of each special command so that I can
                        // much more easily process them
                        let removeThis = `<p class="terminal-output">`;

                        // let specialCommandsFormatted = [];
                        // specialCommands.forEach((item) => {
                        //     specialCommandsFormatted.push(`<p class="terminal-output">${item}</p>`);
                        // });
                        //
                        // function formatOutputForUs(input, output) {
                        //     return formattedData["output"].replace(removeThis + `${input}</p>`, output);
                        // }

                        /*
                            switch (String(formattedData["output"])) {
                                case "[CLEAR]":
                                    history.innerHTML = "";
                                    break;
                                case "[ARTICLES]":
                                    let articleInfo = "<br><br>";
                                    for (let i = 0; i < articleData.length; i++) {
                                        articleInfo += articleData[i]["title"] + "<br>";
                                        articleInfo += articleData[i]["author"] + "<br>";
                                        articleInfo += "<br>";
                                    }

                                    history.innerHTML = history.innerHTML + formatOutputForUs("ARTICLES", articleInfo);
                                    break;

                                case "[READ]":
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

                                    history.innerHTML = history.innerHTML + formattedData["output"].replace(removeThis + "[READ]</p>", articleText);
                                    break;
                                case "[LIST]":
                                    let tempcmds = "<br>";

                                    for (let i = 0; i < commands.length; i++) {
                                        tempcmds += commands[i] + "<br>";
                                    }

                                    history.innerHTML = history.innerHTML + formattedData["output"].replace(removeThis + "[LIST]</p>", tempcmds);
                                    break;
                                case "[THEMES]":
                                    let themeOptions = "<br>";
                                    for (let i in colors) {
                                        themeOptions += i + "<br>";
                                    }

                                    console.log(themeOptions);

                                    history.innerHTML = history.innerHTML + formattedData["output"].replace(removeThis + "[THEMES]</p>", themeOptions);
                                    break;
                                case "[THEME]":
                                    let themeOptionsTwo = `<br>Theme changed to ${cmdSplit[1]}<br>`;
                                    if (cmdSplit[1] in colors) {
                                        changeToThemeAnimated(cmdSplit[1]);
                                    } else {
                                        console.log(cmdSplit[1]);
                                        themeOptions = "<br>That theme does not exist. Please try again.<br>"
                                    }

                                    console.log(themeOptions);

                                    let themeOptionsHis = formattedData["output"].replace(removeThis + "[THEME]</p>", themeOptionsTwo);

                                    history.innerHTML = history.innerHTML + themeOptionsHis;
                                    break;
                                default:
                                    console.log(formattedData["output"]);
                                    history.innerHTML = history.innerHTML + formattedData["output"];//.replaceAll("\\n", "\n").replaceAll('\\"', '\"');
                                    break;
                            }
                         */

                        // must research why this switch statement isn't working

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
                            for (let i in colorsSorted) {
                                themeOptions += colorsSorted[i] + "<br>";
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
                                themeOptions = "<br>That theme does not exist. Please try again.<br>"
                            }

                            console.log(themeOptions);

                            let themeOptionsHis = formattedData["output"].replace(removeThis + "[THEME]</p>", themeOptions);

                            history.innerHTML = history.innerHTML + themeOptionsHis;
                        } else if (String(formattedData["output"]).includes(removeThis + "[VIEW]</p>")) {
                            let themeOptions = `<br>The article ${fullArgs} does not exist.<br>`;

                            for (let i = 0; i < articleData.length; i++) {
                                if (fullArgs.includes(articleData[i]["title"])) {
                                    window.location.assign("/Article1/" + articleData[i]["article_id"]);
                                    break;
                                }
                            }

                            let themeOptionsHis = formattedData["output"].replace(removeThis + "[VIEW]</p>", themeOptions);
                            history.innerHTML = history.innerHTML + themeOptionsHis;
                        }

                        else {
                            // console.log(formattedData["output"]);
                            history.innerHTML = history.innerHTML + formattedData["output"];//.replaceAll("\\n", "\n").replaceAll('\\"', '\"');
                        }

                        // scrolling to the last command
                        let previousCommands = document.getElementsByClassName("previous-command");

                        if (previousCommands.length > 0) {
                            previousCommands[previousCommands.length - 1].scrollIntoView({ behavior: "smooth"});
                        }

                        previousCommandsList.push(cmd);

                    } catch (error) {
                        if (String(error).includes("SyntaxError: Unexpected token'<'")) {
                            console.log("Expected error parsing JSON, move along soldier.");
                        } else {
                            console.error("An error occurred while parsing the JSON: " + error);
                        }
                    }
                    // PERFORM AN ACTION WITH THIS - e.g. append it to history, change url to match directory
                    // ... run an Easter egg, stuff like that.
                }
            };

            // TODO: add Disqus username support
            xhr.open("GET", `${protocol}://${globalvals.HOST}:${PORT}/commands/${directory}/${command}/${args}/${username}`, true);
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
