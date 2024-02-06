import React, { useState, useEffect } from 'react';
import { useParams,  useNavigate} from "react-router-dom";

const Article1 = () => {
    const [article, setArticle] = useState({ title: '', author: '', content: '' });
    const { id } = useParams();
    const navigate = useNavigate();
    const navigateFunc = () => {
        navigate(`/ArticleEdit1/${id}`); // Navigate to Article1 with the selected ID
    };
    const navigateFunc1 = () => {
        navigate(`/ProfilePage`); // Navigate to Article1 with the selected ID
    };

    const navigateFunc2 = () => {
        navigate(`/ProfilePage`);
        alert("Article Deleted")
    };

    const deleteArticle = async () => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                const response = await fetch(`http://localhost:3001/api/Delete/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                navigateFunc2()
                console.log('Article deleted successfully');
                navigate('/ProfilePage'); // or wherever you want to redirect the user after deletion
            } catch (error) {
                console.error("Error deleting article:", error);
            }
        }
    };


    useEffect(() => {



        console.log(id)
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
        <div className="article-container">
            <h1 className="article-title">{article.title}</h1>
            <p className="article-author">By {article.author}</p>
            <div className="article-content">{article.content}</div>
            <div className="buttons-container">
                <button type="button" className="button" onClick={() => navigateFunc()}>Edit</button>
                <button type="button" className="button" onClick={() => navigateFunc1()}>Back</button>
                <button type="button" className="button" onClick={deleteArticle} >Delete</button>
            </div>
            <link rel="stylesheet" href="Profile.css"/>
        </div>


    );
};

export default Article1;