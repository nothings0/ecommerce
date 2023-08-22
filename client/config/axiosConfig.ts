import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://backend-ecommerce-2.onrender.com/api",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default axiosClient;
