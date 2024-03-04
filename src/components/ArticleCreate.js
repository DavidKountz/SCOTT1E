import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';



const ArticleCreate = () => {
    const [article, setArticle] = useState({
        title: '',
        author: '',
        content: '',
        image: ''
    });

    const navigate = useNavigate();
    const handleChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(article)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }


            // Handle the response here. For example, clear the form or give a success message.
        } catch (error) {
            console.error('Error creating article:', error);
        }

        alert("Article created")
        navigate(`/ProfilePage`)
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Create Article</h1>
            <form onSubmit={handleSubmit}>

                <div>
                    <input
                        className="input-field"
                        type="text"
                        name="title"
                        value={article.title}
                        onChange={handleChange}
                        placeholder="Title"
                    />
                </div>
                <br></br>
                <div>
                    <input
                        className="input-field"
                        type="text"
                        name="author"
                        value={article.author}
                        onChange={handleChange}
                        placeholder="Author"
                    />
                </div>
                <br></br>
                <div>
            <textarea
                className="textarea-field"
                name="content"
                value={article.content}
                onChange={handleChange}
                placeholder="Content"
                rows="10"
            />
                </div>
                <br></br>

                <div>

                <input
                    className="input-field"
                    type ="file"
                    name="image"
                    value={article.image}
                    onChange={handleChange}
                    placeholder="Author"
                    accept = "image/jpeg, image/pngm, image/jpg"
                />

                </div>
                <div>
                    <button type="submit" className="button">Create</button>
                </div>
            </form>
            <form action="ProfilePage" method="get">
                <button type="submit" className="button back-button">Go Back</button>
            </form>
        </div>

    );
};

export default ArticleCreate;
