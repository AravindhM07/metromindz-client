import axios from "axios";
const APIENDPOINT = process.env.REACT_APP_API_URL;

const createTask = async (data) => {
    const requestUrl = `${APIENDPOINT}/task/createTask`;
    const response = await axios.post(requestUrl, data, { withCredentials: true });
    return response;
};

const fetchTasks = async () => {
    const requestUrl = `${APIENDPOINT}/task/fetchTasks`;
    const response = await axios.get(requestUrl, { withCredentials: true });
    return response;
};

export { createTask, fetchTasks };