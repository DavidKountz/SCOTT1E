import React, { useState, useEffect } from 'react';
import Text from "./textfiles/article1.txt";
import "./Profile.css";

const DisqusScript = () => {
    useEffect(() => {
        const disqus_config = function () {
            this.pageURL = window.location.href;
            this.pageIdentifier = "Page" + window.location.href;
        };

        (function () {
            var d = document, s = d.createElement('script');
            s.src = 'https://scott1e.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    }, []);

    return null; // Since this is a script, it doesn't render anything
};

const AddToAnyScript = () => {
    useEffect(() => {
        // A custom "onReady" handler for AddToAny
        function my_addtoany_onready() {
            document.getElementById('events').innerHTML = 'AddToAny is ready!';
        }

        // A custom "onShare" handler for AddToAny
        function my_addtoany_onshare(data) {
            document.getElementById('events').innerHTML = 'Shared &quot;<a href="'
                + data.url
                + '">'
                + data.title
                + '</a>&quot; to '
                + data.service
                + '!';
        }

        // Setup AddToAny "onReady" and "onShare" callback functions
        var a2a_config = a2a_config || {};
        a2a_config.callbacks = a2a_config.callbacks || [];
        a2a_config.callbacks.push({
            ready: my_addtoany_onready,
            share: my_addtoany_onshare,
        });
    }, []);

    return (
        <script>
            {`
                var a2a_config = a2a_config || {};
                a2a_config.callbacks = a2a_config.callbacks || [];
                a2a_config.callbacks.push({
                    ready: my_addtoany_onready,
                    share: my_addtoany_onshare,
                });
            `}
        </script>
    );
};

const Article1 = () => {
    const [fileContent, setFileContent] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(Text);
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }
                const content = await response.text();
                setFileContent(content);
            } catch (error) {
                console.error('Error fetching text:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <style>
                {`
                    iframe[src*="ads-iframe"] { display: none; }
                `}
            </style>
            <div>
                <h1>My Article</h1>
                <p>{fileContent}</p>
                {/* AddToAny BEGIN */}
                <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                    <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                    <a className="a2a_button_email"></a>
                    <a className="a2a_button_linkedin"></a>
                    <a className="a2a_button_reddit"></a>
                    <a className="a2a_button_x"></a>
                    <a className="a2a_button_facebook"></a>
                </div>
                <span id="events"></span>
                <AddToAnyScript />
            </div>
            {/* AddToAny END */}
                <div id="disqus_thread"></div>
                <DisqusScript />

        </>
    );
};

export default Article1;