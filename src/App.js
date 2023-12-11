import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProfilePage from "./components/ProfilePage";
import Article1 from "./components/Article1";
import ArticleEdit1 from "./components/ArticleEdit1";
import Analytics from "./components/Analytics";
import * as express from "express";
import app from "express-session/session/memory";
const path = require('path')

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/Article1" element={<Article1 />} />
                <Route path="/ArticleEdit1" element={<ArticleEdit1 />} />
                <Route path="/Analytics" element={<Analytics />} />


                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

const _dirname = path.dirname("")
const buildPath = path.join(_dirname , "../client/build");

app.use(express.static(buildPath))

app.get("/*", function(req, res) {
    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    );
})


export default App;