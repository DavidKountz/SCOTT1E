import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import './ProfilePage.js';

function AdminDashboard() {
    let navigate = useNavigate();

    // Function to navigate to the analytics page
    const goToAnalytics = () => {
        navigate('/analytics');
    };

    const goToProfilePage = () => {
        navigate('/ProfilePage')
    };

    // Placeholder data for the article tiles
    const articleTiles = new Array(4).fill(null).map((_, index) => (
        <div key={index} className="article-tile">
            <h2>Title</h2>
            <p>Article Text</p>
            <div className="article-actions">
                <button>View Article</button>
                <span>Date Published</span>
            </div>
        </div>
    ));

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="nav-group">
                    <button className="active" onClick={goToProfilePage}>Dashboard</button>
                    <button onClick={goToAnalytics}>Analytics</button>
                    {/* Add navigation buttons here */}
                </div>

                <div className="nav-group">
                    <button>Change Password</button>
                    <button>Log out</button>
                </div>
            </aside>
            <main className="content">
                <input className="filter" type="text" placeholder="Filter" />
                <section className="articles-section">
                    <h1>ARTICLES</h1>
                    {articleTiles}
                </section>
            </main>
        </div>
    );
}

export default AdminDashboard;