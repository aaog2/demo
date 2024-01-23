import axios from "axios";

let usertoken = localStorage.getItem("token");
axios.defaults.baseURL = "http://localhost:8000/api/";
axios.defaults.headers.common["Authorization"] = `Bearer ${usertoken}`;
console.warn("user token", usertoken);

export default axios;
