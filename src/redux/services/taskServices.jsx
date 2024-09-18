import axios from "axios";
const APIENDPOINT = process.env.REACT_APP_API_URL;

const handleTask = async (data) => {
    const requestUrl = `${APIENDPOINT}/task/handleTask`;
    const response = await axios.post(requestUrl, data, { withCredentials: true });
    return response;
};

const fetchTasks = async () => {
    const requestUrl = `${APIENDPOINT}/task/fetchTasks`;
    const response = await axios.get(requestUrl, { withCredentials: true });
    return response;
};

const deleteTask = async (id) => {
    const requestUrl = `${APIENDPOINT}/task/deleteRequest?id=${id}`;
    const response = await axios.get(requestUrl, { withCredentials: true });
    return response;
};

export { handleTask, fetchTasks, deleteTask };