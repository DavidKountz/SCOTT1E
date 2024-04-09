import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';


axios.defaults.withCredentials = true;

export default function AdminLogin() {
    const navigate = useNavigate();

    const onFinish = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');

        axios.post(`http://localhost:3001/validatePassword`, { username, password })
            .then(res => {
                if (res.data.validation) {
                    navigate('/AdminDashboard');
                } else {
                    alert('Incorrect password.');
                }
            });
    };

    return (
        <div className="admin-login">
            <div className="login-card">
                <h1 className="login-header">SCOTT1E</h1>
                <form name="normal_login" className="login-form" onSubmit={onFinish}>
                    <div className="form-group">
                        <input name="username" required placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <input name="password" required type="password" placeholder="Password" />
                    </div>
                    <div className="login-options">
                    </div>
                    <div className="form-group">
                        <button type="submit" className="login-button">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}