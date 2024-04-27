import axios from 'axios';
import { globalvals as globals } from "../variables";

axios.defaults.withCredentials = true;

export const checkSession = async () => {
    try {
        const response = await axios.get(`http://${globals.HOST}:${globals.API_PORT_NUM}/checkSession`, { withCredentials: true });
        return response.data.sessionActive;
    } catch (error) {
        console.error('Error during session check:', error);
        return false;
    }
};