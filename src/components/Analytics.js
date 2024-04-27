import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Analytics.css';
import { globalvals as globals } from "../variables";

function Analytics() {
    const [articles, setArticles] = useState([]);
    const [commands, setCommands] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${globals.API_PORT}api/analytics`)
            .then(response => {
                console.log('Fetched data:', response.data);
                setArticles(response.data.article || []);
                setCommands(response.data.commands || []);
            })
            .catch(error => {
                console.error('Error fetching analytics data:', error);
            });
    }, []);

    const goBack = () => {
        navigate('/AdminDashboard');
    };

    return (
        <div className="analytics-container">
            <button onClick={goBack} className="back-button">Back to Admin Dashboard</button>
            <h1>Analytics</h1>

            <section>
                <h2>Article Analytics</h2>
                <table className="analytics-table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Views</th>
                        <th>Comments</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.views}</td>
                            <td>{item.comments}</td>
                        </tr>
                    )) || []}
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Command Analytics</h2>
                <table className="analytics-table">
                    <thead>
                    <tr>
                        <th>Command</th>
                        <th>Usage Count</th>
                    </tr>
                    </thead>
                    <tbody>
                    {commands?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.uses}</td>
                        </tr>
                    )) || []}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Analytics;