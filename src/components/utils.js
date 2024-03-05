import axios from 'axios';

axios.defaults.withCredentials = true;

export const checkSession = async () => {
    try {
        const response = await axios.get(`http://${process.env.REACT_APP_DB_HOST}:3001/checkSession`, { withCredentials: true });
        return response.data.sessionActive;
    } catch (error) {
        console.error('Error during session check:', error);
        return false;
    }
};