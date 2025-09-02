import axios from "axios";

const Api = axios.create({
  // baseURL: "https://schooldashboard-9zi1.onrender.com/db",
  baseURL: "http://localhost:5000/db",
});

// Attach token if available
Api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default Api;
