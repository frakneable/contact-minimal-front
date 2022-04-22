import Axios from 'axios';

const api = Axios.create({
    baseURL: 'https://minimalcontactmanager.azurewebsites.net',
});

export default api;