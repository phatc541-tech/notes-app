import axios from "axios";

const api = axios.create({

  baseURL:
    "https://YOUR-RENDER-URL.onrender.com/api"

});

export default api;