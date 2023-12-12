import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Analytics.css';

function Analytics() {
    const [analytics, setAnalytics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // axios.get('http://localhost:3001/api/analytics')
        //     .then(response => {
        //         console.log('Fetched data:', response.data); // Add this line to log the response
        //         setAnalytics(response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching analytics data:', error);
        //     });
    }, []);

    const goBack = () => {
        navigate('/AdminDashboard');
    };

    return (
        <div className="analytics-container">
            <button onClick={goBack} className="back-button">Back to Admin Dashboard</button> {}
            <h1>Article Analytics</h1>
            <table className="analytics-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Views</th>
                    <th>Comments</th>
                </tr>
                </thead>
                <tbody>
                {analytics.map((item, index) => (
                    <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.views}</td>
                        <td>{item.comments}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Analytics;