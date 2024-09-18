import axios from "axios";
const APIENDPOINT = process.env.REACT_APP_API_URL;

const createTask = async (data) => {
    const requestUrl = `${APIENDPOINT}/task/create`;
    const response = await axios.post(requestUrl, data, { withCredentials: true });
    return response;
};

export { createTask };