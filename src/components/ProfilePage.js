import React, {useState} from 'react';
import "./Profile.css"
import Dropdown from "./Dropdown";




const ProfilePage = () => {
    const [selected, setSelected] = useState("React");
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
                <h2>SCOTTIE</h2>
                <p> SCOTT1E@email.com</p>
            </section>

            <div id="Articles">
                <h2>Your Articles:</h2>

                <Dropdown selected = {selected} setSelected={setSelected}/>
            </div>
            <div>
            </div>
            <div>
                <a href="ArticleCreate">Create New Article</a> <div></div>
                                <a href="AdminDashboard">Dashboard</a>

            </div>
            <link rel="stylesheet" href="Profile.css"/>


        </main>
        </body>
        </html>


    );
};


export default ProfilePage;