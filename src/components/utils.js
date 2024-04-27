import axios from 'axios';
const globals = import("../../variables").globalvals;
const reactAppDBHost = globals.HOST;
const apiPortNum = globals.API_PORT_NUM;

axios.defaults.withCredentials = true;

export const checkSession = async () => {
    try {
        const response = await axios.get(`http://${reactAppDBHost}:${apiPortNum}/checkSession`, { withCredentials: true });
        return response.data.sessionActive;
    } catch (error) {
        console.error('Error during session check:', error);
        return false;
    }
};