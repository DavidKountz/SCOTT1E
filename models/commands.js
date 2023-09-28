function appendOutput(cmd, output) {
    // the element to append to
    let historyDiv = document.getElementById("history");
    let node = document.createElement("p");
    node.innerHTML = `<section class="previousCommand">
            <span class="user"><span class="green">guest@scott1e.com</span>:<span class="steel">~</span>$</span> ${output}</section>`;
    historyDiv.appendChild(node);
    alert(historyDiv);
}

function ls() {
    // note: this is a proof of concept. the real thing will need to use/be used in Node.JS, as traditional JavaScript is only client-side. A request to the server will need to be submitted for almost every command executed
    return "ls<br>"+"these are the files";
}

function command(cmd) {
    // gonna perform command actions here and generate output
    let output = ls(); // temporary
    appendOutput(cmd, output);
}

command("ls");


