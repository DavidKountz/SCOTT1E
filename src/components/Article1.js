import React, { useState, useEffect } from 'react';
import Text from "./textfiles/article1.txt";
import "./Profile.css"

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
        <html lang="en">
        <head>
            <title>Article Page</title>
        </head>
        <body>
        <h1>My Article</h1>
        <p>{fileContent}</p>
        </body>
        </html>
    );
};


export default Article1;

