import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';



const ArticleCreate = () => {
    const [article, setArticle] = useState({
        title: '',
        author: '',
        content: ''
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

        alert("Article created, click the Go Back button")
        navigate(`/ProfilePage`)
    };

    return (
        <div>
            <h1>Create Article</h1>
            <form  onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="title"
                        value={article.title}
                        onChange={handleChange}
                        placeholder="Title"
                    />
                </div>
                <br />
                <div>
                    <input
                        type="text"
                        name="author"
                        value={article.author}
                        onChange={handleChange}
                        placeholder="Author"
                    />
                </div>
                <br />
                <div>
            <textarea
                name="content"
                value={article.content}
                rows="10" cols="100"
                onChange={handleChange}
                placeholder="Content"
            />
                </div>
                <br />
                <div>


                    <button type="submit">Create</button>

                </div>
            </form>
            <form action ="ProfilePage" method ="get">
            <button type="submit">Go Back</button>
            </form>
        </div>

    );
};

export default ArticleCreate;
