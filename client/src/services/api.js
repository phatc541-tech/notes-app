import axios from "axios";

const api = axios.create({

  baseURL:
    "https://notes-app-2-lppk.onrender.com/api"

});

export default api;