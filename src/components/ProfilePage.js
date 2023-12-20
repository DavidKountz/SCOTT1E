import React from 'react';
import "./Profile.css"

const ProfilePage = () => {
    return (
        <html lang="">
        <head>
            <title>Profile Page</title>
        </head>
        <body>
        <header>
            <h1>Welcome back!</h1>
        </header>

        <main>
            <section className="author-info">
                <h2>Author: SCOTTIE</h2>
                <p>Email: SCOTT1E@email.com</p>
            </section>

            <div id="Articles">
                <h2>Your Articles:</h2>
                <a href="Article1">Article</a>
            </div>
            <div>
                <a href="ArticleEdit1">Edit Article</a>
            </div>
            <div>
                <a href="ArticleCreate">Create New Article</a>
            </div>


        </main>
        </body>
        </html>


    );
};

export default ProfilePage;