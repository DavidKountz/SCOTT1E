import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Profile.css';

const DisqusScript = () => {
    useEffect(() => {
        const disqus_config = function () {
            this.pageURL = window.location.href;
            this.pageIdentifier = 'Page' + window.location.href;
        };

        (function () {
            var d = document,
                s = d.createElement('script');
            s.src = 'https://scott1e.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    }, []);

    return null; // Since this is a script, it doesn't render anything
};

const AddToAnyScript = () => {
    // A custom "onReady" handler for AddToAny
    function my_addtoany_onready() {
        document.getElementById('events').innerHTML = 'AddToAny is ready!';
    }

    // A custom "onShare" handler for AddToAny
    function my_addtoany_onshare(data) {
        document.getElementById('events').innerHTML =
            'Shared &quot;<a href="' +
            data.url +
            '">' +
            data.title +
            '</a>&quot; to ' +
            data.service +
            '!';
    }

    // Setup AddToAny "onReady" and "onShare" callback functions
    var a2a_config = a2a_config || {};
    a2a_config.callbacks = a2a_config.callbacks || [];
    a2a_config.callbacks.push({
        ready: my_addtoany_onready,
        share: my_addtoany_onshare,
    });

    return null; // Since this is a script, it doesn't render anything
};

const Article1 = () => {
    const [article, setArticle] = useState({ title: '', author: '', content: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    const navigateFunc = () => {
        navigate(`/ArticleEdit1/${id}`);
    };

    const navigateFunc1 = () => {
        navigate(`/ProfilePage`);
    };

    const navigateFunc2 = () => {
        navigate(`/ProfilePage`);
        alert('Article Deleted');
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
                navigateFunc2();
                console.log('Article deleted successfully');
                navigate('/ProfilePage'); // or wherever you want to redirect the user after deletion
            } catch (error) {
                console.error('Error deleting article:', error);
            }
        }
    };

    useEffect(() => {
        console.log(id);
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
                    content: data.article_content,
                });
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        if (id) fetchArticle(); // Check if 'id' is not null or undefined before fetching
    }, [id]); // Depend on 'id' to re-run the effect when it changes

    return (
        <>
            <style>
                {`
          iframe[src*="ads-iframe"] { display: none; }
        `}
            </style>
            <div className="article-container">
                <h1 className="article-title">{article.title}</h1>
                <p className="article-author">By {article.author}</p>
                <div className="article-content">{article.content}</div>
                <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                    <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                    <a className="a2a_button_email"></a>
                    <a className="a2a_button_linkedin"></a>
                    <a className="a2a_button_reddit"></a>
                    <a className="a2a_button_x"></a>
                    <a className="a2a_button_facebook"></a>
                </div>
                <span id="events"></span>
                <AddToAnyScript />
            </div>
            {/* AddToAny END */}
            <div id="disqus_thread"></div>
            <DisqusScript />
            <div className="buttons-container">
                <button type="button" className="button" onClick={navigateFunc}>
                    Edit
                </button>
                <button type="button" className="button" onClick={navigateFunc1}>
                    Back
                </button>
                <button type="button" className="button" onClick={deleteArticle}>
                    Delete
                </button>
            </div>
            <div>
                <link rel="stylesheet" href="Profile.css" />
            </div>
        </>
    );
};

export default Article1;
