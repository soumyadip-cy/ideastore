import axios from "axios";

//This uses the Vite environment variable MODE to set the base URL for axios requests based on the mode (development or production). MODE=development when using 'npm run dev' and MODE=production when using 'npm run build' and 'npm run preview'.
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;