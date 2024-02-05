import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {data} from "express-session/session/cookie";

const ArticleEdit = () => {
    const [article, setArticle] = useState({ title: '', author: '', content: '' });
    const { id } = useParams();
    const navigate = useNavigate();



    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/Article/${id}`);
                if (!response.ok) throw new Error('Failed to fetch article');
                const data = await response.json();
                setArticle({
                    title: data.title,
                    author: data.author,
                    content: data.article_content
                });

            } catch (error) {
                console.error(error);
            }
        };
        fetchArticle();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle((prevArticle) => ({ ...prevArticle, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/api/Article3/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(article),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            console.log(id)
        }
        navigate(`/Article1/${id}`);
    };

    return (
        <div>
            <h2>Edit Article</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={article.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Author:</label>
                    <input type="text" name="author" value={article.author} onChange={handleChange} />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea name="content" value={article.content} onChange={handleChange} />
                </div>
                <button type="submit">Update Article</button>

            </form>
        </div>
    );
};

export default ArticleEdit;
