import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {data} from "express-session/session/cookie";

const ArticleEdit = () => {
    const [article, setArticle] = useState({ title: '', author: '', content: '', image: '' });
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
                    content: data.article_content,
                    image: data.image
                });

            } catch (error) {
                console.error(error);
            }
        };
        fetchArticle();
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === 'image') {

            setArticle({ ...article, image: e.target.files[0] });
        } else {

            setArticle({ ...article, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', article.title);
        formData.append('author', article.author);
        formData.append('content', article.content);
        if (article.image) {
            formData.append('image', article.image);
        }
            const response = await fetch( `http://localhost:3001/api/Article3/${id}`, {
                method: 'PUT',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }


        navigate(`/Article1/${id}`);
    };
    console.log(article.id);
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
                    <textarea name="content" value={article.content} onChange={handleChange} rows="50" cols="100"  />
                </div>

                <div>
                    <label>Update image</label>
                    <input
                        className="input-field"
                        type ="file"
                        name="image"
                        onChange={handleChange}
                        placeholder="Image"
                        accept = "image/jpeg, image/png, image/jpg"
                    /></div>

                <button type="submit">Update Article</button>

            </form>
            <link rel="stylesheet" href="ArticleEdit.css" />
        </div>
    );
};

export default ArticleEdit;
