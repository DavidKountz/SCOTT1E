import React, { useState, useEffect } from 'react';

const Article1 = () => {
    const [article, setArticle] = useState({ title: '', author: '', content: '' });

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/article/1');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setArticle({
                    title: data.title,
                    author: data.author,
                    content: data.article_content
                });
                console.log(data)
            } catch (error) {
                console.error("Error fetching article:", error);
            }
        };

        fetchArticle();
    }, []);

    return (
        <div>
            <h1>{article.title}</h1>
            <p>By {article.author}</p>
            <div>{article.content}</div>
        </div>
    );
};

export default Article1;
