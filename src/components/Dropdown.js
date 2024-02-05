import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Dropdown({ selected, setSelected }) {
    const [article, setArticle] = useState([]);
    const navigate = useNavigate(); // Use the hook

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/Dropdown');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setArticle(data);
                console.log(data);
                if (Array.isArray(data)) { // Check if data is an array before setting it
                    setArticle(data);
                } else {
                    console.error("Fetched data is not an array:", data);
                }

            } catch (error) {
                console.error("Error fetching article:", error);
            }
        };

        fetchArticle();
    }, []);

    const [isActive, setIsActive] = useState(false);


    const handleSelect = (articleTitle, articleId) => {
        setSelected(articleTitle);

        navigate(`/Article1/${articleId}`);
    };

    selected= " ";
    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                {"Select Article: "} <b>{selected}</b>
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {article.map((article) => (
                        <div
                            key={article.id}
                            onClick={(e) => handleSelect(article.title, article.article_id)}
                            className="dropdown-item"
                        >
                            <b>{article.title}</b>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;