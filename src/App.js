import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard'; // You need to create this component
import Terminal from './components/Terminal';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Admin" element={<AdminLogin />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                <Route path="/Terminal" element={<Terminal />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;