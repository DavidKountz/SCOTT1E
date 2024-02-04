import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const Article1 = () => {
    const [article, setArticle] = useState({ title: '', author: '', content: '' });
    const { id } = useParams(); // Correctly use useParams at the top level

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/Article/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setArticle({
                    title: data.title,
                    author: data.author,
                    content: data.article_content
                });
            } catch (error) {
                console.error("Error fetching article:", error);
            }
        };

        if (id) fetchArticle(); // Check if 'id' is not null or undefined before fetching
    }, [id]); // Depend on 'id' to re-run the effect when it changes

    return (
        <div>
            <h1>{article.title}</h1>
            <p>By {article.author}</p>
            <div>{article.content}</div>
        </div>
    );
};

export default Article1;