function runSelf() {
	let output = `
        <section class="previousCommand">
            <span class="user"><span class="green">guest@scott1e.com</span>:<span class="steel">~</span>$</span>
            <span id="whoami">whoami</span>
            <p>
                Hey! My name is Scott, and I'm super cool and stuff :D I like blogging I hope,
                because that's what this site is all about!<br><br>

                :D<br><br>

                <pre> <!-- https://www.asciiart.eu/text-to-ascii-art -->
                    ░█▀▀░█▀▀░█▀█░▀█▀░▀█▀░▀█░░█▀▀
                    ░▀▀█░█░░░█░█░░█░░░█░░░█░░█▀▀
                    ░▀▀▀░▀▀▀░▀▀▀░░▀░░░▀░░▀▀▀░▀▀▀
                    
                    
                </pre>
            </p>
        </section>`;
    return output;
}

module.exports.runSelf = runSelf;