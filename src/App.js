import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProfilePage from "./components/ProfilePage";
import ArticleEdit1 from "./components/ArticleEdit1";
import Analytics from "./components/Analytics";
import Article1 from "./components/Article1"
import ArticleCreate from "./components/ArticleCreate"
import Dropdown from "./components/Dropdown"
import Terminal from "./components/Terminal";
// You need to create this component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/Article1/:id" element={<Article1 />} />
                <Route path="/ArticleEdit1/:id" element={<ArticleEdit1 />} />
                <Route path="/Analytics" element={<Analytics />} />
                <Route path="/ArticleCreate" element={<ArticleCreate />} />
                <Route path="/Dropdown" element={<Dropdown />} />
                <Route path="/Terminal" element={<Terminal />} />



                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}






export default App;