import React, {useEffect, useState} from 'react';
import "./Profile.css"
import Dropdown from "./Dropdown";
import {useParams} from "react-router-dom";




const ProfilePage = () => {
    const [selected, setSelected] = useState("React");
    const [author, setAuthor] = useState({ username: '' });


    useEffect(() => {


        const fetchArticle = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/Article21`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);

                }
                const data = await response.json();
                setAuthor({
                   username: data.username
                });
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle()

    } );

    return (
        <div className="profile-container">

            <header>
                <h1>Welcome back!</h1>
            </header>

            <main>
                <section className="profile-container">

                    <h2>{author.username}</h2>

                    <p>{author.username}@email.com</p>

                    <br></br>
                    <br></br>
                    <br></br>

                <div id="profile-container">
                    <h2>Articles:</h2>
                    <Dropdown selected={selected} setSelected={setSelected} />
                </div>

                    <br></br>
                    <br></br>
                    <br></br>

                <div id = "profile-container">
                    <a href="ArticleCreate">Create New Article</a>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div id = "profile-container">
                    <a href="AdminDashboard">Dashboard</a>
                </div>
            </section>
            </main>
        </div>
    );
};


export default ProfilePage;