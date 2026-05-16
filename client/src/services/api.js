import axios from "axios";

const api = axios.create({

  baseURL:
    "https://notes-app-api.onrender.com/api"

});

export default api;