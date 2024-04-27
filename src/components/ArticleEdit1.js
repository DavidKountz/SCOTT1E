import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './article.css';

const globals = import("variables").globalvals;

const ArticleEdit = () => {
    const [article, setArticle] = useState({ title: '', author: '', content: '', image: '' });
    const { id } = useParams();
    const navigate = useNavigate();



    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`${globals.API_PORT}api/Article/${id}`);
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



    const handleContentChange = (content) => {
        setArticle({ ...article, content });
    };

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
            const response = await fetch( `${globals.API_PORT}api/Article3/${id}`, {
                method: 'PUT',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }


        navigate(`/Article1/${id}`);
    };
    console.log(`${article.title}`);
    return (

        <div className="form-container">
            <h2>Edit Article</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>

                    <input
                        className="input-field"
                        type="text"
                        name="title"
                        value = {article.title}
                        onChange={handleChange} />
                </div>
                <br></br>
                <div>
                    <label>Author:</label>
                    <input  className="input-field"
                            type="text"
                            name="author"
                            value={article.author}
                            onChange={handleChange} />
                </div>
                <br></br>
                <div>
                    <label>Content:</label>
                    <ReactQuill
                        value={article.content}
                        onChange={handleContentChange}
                    />
                </div>
                <br></br>
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

                <button type="submit" className="button back-button">Update Article</button>


            </form>



        </div>
    );
};

export default ArticleEdit;
