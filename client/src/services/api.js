import axios from "axios";

const api = axios.create({

  baseURL:

    "https://notes-app-2-lppk.onrender.com/api"

});

// ======================
// ADD TOKEN
// ======================

api.interceptors.request.use(

  (config) => {

    const token =

      localStorage.getItem(

        "token"

      );

    // add token

    if (token) {

      config.headers.Authorization =

        `Bearer ${token}`;

    }

    return config;

  }

);

export default api;