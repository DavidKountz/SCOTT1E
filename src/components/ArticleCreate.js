import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import './article.css';

import { globalvals as globals } from "../variables";
import {checkSession} from "./utils";



const ArticleCreate = () => {
    const [article, setArticle] = useState({
        title: '',
        author: '',
        content: '',
        image: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const verifySession = async () => {
            const sessionActive = await checkSession();
            if (!sessionActive) {
                navigate('/AdminLogin');
            }
        };

        verifySession();
    }, [navigate]);


    // Handles changes in form inputs and file selection
    const handleChange = (e) => {
        if (e.target.name === 'image') {

            const file = e.target.files[0];
            if (file) {
                setArticle({ ...article, image: file });
            }
        } else {

            setArticle({ ...article, [e.target.name]: e.target.value });
        }
    };

    const handleContentChange = (content) => {
        setArticle({ ...article, content });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', article.title);
        formData.append('author', article.author);
        formData.append('content', article.content);
        console.log(article.image)
        if (article.image) {
            formData.append('image', article.image);
        }
        else {

            article.image = 10
            formData.append('image', article.image);
        }
        console.log(article.image);

        const response = await fetch(`${globals.API_PORT}api/articles`, {
            method: 'POST',
            body: formData,
        });

        alert("ARTICLE HAS BEEN CREATED")
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
                    <ReactQuill

                        value={article.content}
                        onChange={handleContentChange}
                        placeholder="Content"
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
                    <form action="ProfilePage" method="get">
                        <button type="submit" className="button back-button">Back</button>
                    </form>
                    <button type="submit" className="button back-button">Create</button>
                </div>
            </form>





        </div>

    );
};

export default ArticleCreate;