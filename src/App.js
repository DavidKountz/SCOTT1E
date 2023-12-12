import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
<<<<<<< HEAD
import AdminDashboard from './components/AdminDashboard';
import ProfilePage from "./components/ProfilePage";
import Article1 from "./components/Article1";
import ArticleEdit1 from "./components/ArticleEdit1";
import Analytics from "./components/Analytics";
=======
import AdminDashboard from './components/AdminDashboard'; // You need to create this component
import Terminal from './components/Terminal';
>>>>>>> TEMPORARY

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Admin" element={<AdminLogin />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
<<<<<<< HEAD
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/Article1" element={<Article1 />} />
                <Route path="/ArticleEdit1" element={<ArticleEdit1 />} />
                <Route path="/Analytics" element={<Analytics />} />


=======
                <Route path="/Terminal" element={<Terminal />} />
                <Route path="/" element={<Terminal />} />
>>>>>>> TEMPORARY
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;