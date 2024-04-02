import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Password.css';

function Password() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setMessage('New passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/change-password', {
                currentPassword,
                newPassword
            });
            setMessage(response.data.message);
            if(response.data.success) {
                // Optionally reset the state or redirect the user
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    const goBackToAdminDashboard = () => {
        navigate('/AdminDashboard');
    };

    return (
        <div className="change-password-page"> {/* Added wrapper div with a unique class for styling */}
            <div className="change-password-container">
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit} className="change-password-form">
                    <div>
                        <label>Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Change Password</button>
                </form>
                <button onClick={goBackToAdminDashboard} className="back-button">Back to Admin Dashboard</button>
                {message && <p className="change-password-message">{message}</p>}
            </div>
        </div>
    );
}

export default Password;