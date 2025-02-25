import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosClient.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      config.headers.Authorization = `Bearer ${user?.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    if (error.response?.status === 401) {
      const auth = useAuth();
      const navigate = useNavigate();

      auth.logout();
      navigate("/auth/login");
      // window.location.href = "/auth/login";
    }
    Promise.reject(error.response.data);
  },
);

export default axiosClient;
