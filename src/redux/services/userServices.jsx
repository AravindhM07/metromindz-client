import axios from "axios";
const APIENDPOINT = process.env.REACT_APP_API_URL;

const addUser = async (data) => {
    const requestUrl = `${APIENDPOINT}/user/signup`;
    const response = await axios.post(requestUrl, data, { withCredentials: true });
    return response;
};

const fetchUser = async () => {
    const requestUrl = `${APIENDPOINT}/user/profile`;
    const response = await axios.get(requestUrl, { withCredentials: true });
    return response;
}

const login = async (data) => {
    const requestUrl = `${APIENDPOINT}/user/signin`;
    const response = await axios.post(requestUrl, data, { withCredentials: true });
    return response;
};

const logout = async () => {
    const requestUrl = `${APIENDPOINT}/user/signout`;
    const response = await axios.post(requestUrl, {}, { withCredentials: true });
    return response;
}

export { addUser, fetchUser, login, logout };