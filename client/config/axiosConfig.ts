import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:1337/api",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default axiosClient;
