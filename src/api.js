import axios from "axios";

const fetchClient = () => {
  const defaultOptions = {
    baseURL: "https://api-bugbusters.azurewebsites.net",
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return instance;
};

export default fetchClient();
