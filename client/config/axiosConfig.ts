import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "https://backend-ecommerce-2.onrender.com/api",
  baseURL: "https://x-ecommerce.vercel.app/api/v1",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});
const axiosPrimary = axios.create({
  baseURL: "https://backend-ecommerce-2.onrender.com/api",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});
export { axiosPrimary };
export default axiosClient;
