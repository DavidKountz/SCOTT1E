import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProfilePage from "./components/ProfilePage";
import Article1 from "./components/Article1";
import ArticleEdit1 from "./components/ArticleEdit1";
// You need to create this component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/Article1" element={<Article1 />} />
                <Route path="/ArticleEdit1" element={<ArticleEdit1 />} />


                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;