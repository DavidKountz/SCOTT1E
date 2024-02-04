import axios from 'axios';

export const checkSession = async () => {
    try {
        const response = await axios.get(`http://${HOSTNAME}:3001/checkSession`);
        return response.data.sessionActive;
    } catch (error) {
        return false;
    }
};