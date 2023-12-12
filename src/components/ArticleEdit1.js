import React, {useEffect, useState} from 'react';
import Text from "./textfiles/article1.txt";
import "./Profile.css"

const ArticleEdit1 = () => {
    const [fileContent1, setFileContent] = useState("");

    useEffect(pop, [Text]);

    function pop() {
        let fetchData;
        fetchData = async () => {
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
    }


    return (
        <html lang="en">
        <head>
            <title>Edit Text File</title>
        </head>
        <body>
        <h1>Edit Text File</h1>
        <form action={`/ArticleEdit1`} method="post">
          <textarea value ={fileContent1} rows="10" cols="100" onChange={(e) => setFileContent(e.target.value)}></textarea>
            <br />
            <input type="submit" value="Save" />
            <br />
        </form>
        <form action="ProfilePage" method="get">
            <button type="submit">Back</button>
        </form>
        </body>
        </html>
    );
};

export default ArticleEdit1;