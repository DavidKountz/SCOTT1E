import React from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
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
                <button>Dashboard</button>
                <button>Analytics</button>
                <button>Change Password</button>
                <button>Log out</button>
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