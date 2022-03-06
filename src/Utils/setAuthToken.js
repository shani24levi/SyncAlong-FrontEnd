import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        //if the token isnt ther so Delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;