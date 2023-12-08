import React from 'react';
import "./Terminal.css";

function Home() {
    const script = `<script type="text/javascript" src="./TerminalConsole.js" defer></script>`;
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
                <textarea id="cliInterface" spellCheck="false" autoFocus></textarea>
            </div>
            <div dangerouslySetInnerHTML={{ __html: script }}></div>
        </div>
    );
}

export default Home;
