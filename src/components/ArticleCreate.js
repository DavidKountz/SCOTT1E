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
        if (e.target.name === 'image') {

            setArticle({ ...article, image: e.target.files[0] });
        } else {

            setArticle({ ...article, [e.target.name]: e.target.value });
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', article.title);
        formData.append('author', article.author);
        formData.append('content', article.content);
        if (article.image) {
            formData.append('image', article.image);
        }
        const response = await fetch('http://localhost:3001/api/articles', {
            method: 'POST',
            body: formData,
        });

        alert("ARTICLE CREATED")
        navigate("/ProfilePage")

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
                        onChange={handleChange}
                        placeholder="Image"
                        accept = "image/jpeg, image/png, image/jpg"
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