import axios from 'axios';

export default axios.create({
    baseURL: "https://lab-rota-api.herokuapp.com",
    headers: {
        "Content-Type": "application/json"
    }
})