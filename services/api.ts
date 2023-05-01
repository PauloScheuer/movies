import axios from "axios";

// criação da conexão com a api
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
