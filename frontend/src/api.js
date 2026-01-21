import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    });

    // Attach access token automatically
    api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");
        console.log("Interceptor token", token);
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
    );

    // ---------- API HELPERS ----------
    export const getForms = () => api.get("/forms/");
    export const getForm = (id) => api.get(`/forms/${id}/`);
    export const submitResponse = (data) =>
    api.post('/responses/', data);

    export const createForm = (formData) =>
    api.post("/forms/", formData);

export default api;
