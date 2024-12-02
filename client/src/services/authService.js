import axios from 'axios';

export const loginUser = (username, password) => {
    return axios.post('/api/auth/login', {
        username,
        password,
    });
};
export const registerUser = (username, password) => {
    return axios.post('/api/auth/register', {
        username,
        password,
    });
};
