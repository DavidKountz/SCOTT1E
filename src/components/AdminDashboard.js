import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkSession } from './utils';
import './AdminDashboard.css';
import './ProfilePage.js';
import './Article1.js'
import {data} from "express-session/session/cookie";

function AdminDashboard() {
    let navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        const verifySession = async () => {
            const sessionActive = await checkSession();
            if (!sessionActive) {
                navigate('/AdminLogin');
            }
        };

        verifySession();
        fetchArticles();
    }, [navigate, searchTerm]);

    const fetchArticles = async () => {
        try {
            const queryString = searchTerm ? `?searchTerm=${encodeURIComponent(searchTerm)}` : '';
            const response = await fetch(`http://localhost:3001/api/articleGrab${queryString}`);
            const data = await response.json();
            setArticles(data);
        } catch (error) {
            console.error("Failed to fetch articles:", error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3001/logout', { credentials: 'include' });
            if (response.ok) {
                // If the logout was successful, redirect to the home page
                navigate('/');
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Function to navigate to the analytics page
    const goToAnalytics = () => {
        navigate('/analytics');
    };


    const goToProfilePage = () => {
        navigate('/ProfilePage')
    };

    const goToPassword = () => {
        navigate('/Password')
    };

    const articleTiles = articles.map((article, index) => (
        <div key={index} className="article-tile">
            <h2>{article.title}</h2>
            <p>{article.article_content.substring(0, 100)}...</p> {}
            <div className="article-actions">
                <button >View Article</button>
                <span>Views: {article.views}</span>
            </div>
        </div>
    ));

    return (
        <div className="admin-dashboard-container">
            <aside className="admin-dashboard-sidebar">
                <div className="nav-group">
                    <button className="active" onClick={goToProfilePage}>Dashboard</button>
                    <button onClick={goToAnalytics}>Analytics</button>
                    {}
                </div>

                <div className="nav-group bottom">
                    <button onClick={goToPassword}>Change Password</button>
                    <button onClick={handleLogout}>Log out</button>
                </div>
            </aside>
            <main className="admin-dashboard-content">
                <input
                    className="filter"
                    type="text"
                    placeholder="Filter"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <section className="articles-section">
                    <h1>ARTICLES</h1>
                    {articles.length > 0 ? articleTiles : <p>Loading articles...</p>} {}
                </section>
            </main>
        </div>
    );
}
export default AdminDashboard;