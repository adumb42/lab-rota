import axios from 'axios';

export default axios.create({
    baseURL: "https://lab-rota-api.azurewebsites.net/",
    headers: {
        "Content-Type": "application/json"
    }
})