import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://backend-md7c.onrender.com/api",
  // baseURL: "https://x-ecommerce.vercel.app/api/v1",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});
const axiosPrimary = axios.create({
  baseURL: "https://backend-md7c.onrender.com/api",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});
export { axiosPrimary };
export default axiosClient;
