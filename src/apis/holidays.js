import axios from 'axios';

export default axios.create({
    baseURL: "https://sugar-lab-rota-render-api.onrender.com",
    headers: {
        "Content-Type": "application/json"
    }
})