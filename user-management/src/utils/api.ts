import axios from "axios";

// create an axios instance with default config
const api = axios.create({
  baseURL : 'https://jsonplaceholder.typicode.com',
  headers : {
    'Content-Type': 'application/json',
  },
});

export default api;

