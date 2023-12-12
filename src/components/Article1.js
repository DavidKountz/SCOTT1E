import React, { useState, useEffect } from 'react';
import Text from "./textfiles/article1.txt";
import "./Profile.css";

const DisqusScript = () => {
    useEffect(() => {
        var disqus_config = function () {
            this.page.url = window.location.href;
            this.page.identifier = "Page" + window.location.href;
        };

        (function () {
            var d = document, s = d.createElement('script');
            s.src = 'https://EXAMPLE.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    }, []);

    return null; // Since this is a script, it doesn't render anything
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
                <div id="disqus_thread"></div>
                <DisqusScript />
            </div>
        </>
    );
};

export default Article1;
