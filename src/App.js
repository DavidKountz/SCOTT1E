import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard'; // You need to create this component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;