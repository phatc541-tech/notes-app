import axios from "axios"

const api = axios.create({
  baseURL: "https://notes-app-1-jivb.onrender.com/api"
})

export default api