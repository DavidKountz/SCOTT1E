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
        <div>
            <h1>{article.title}</h1>
            <p>By {article.author}</p>
            <div>{article.content}</div>
            <div onClick={() =>  navigateFunc()}>
                <button type="submit">Edit</button></div>
            <div onClick={() =>  navigateFunc1()}>
                <button type="submit">Back</button></div>

        </div>

    );
};

export default Article1;