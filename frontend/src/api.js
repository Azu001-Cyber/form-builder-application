import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
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
    export const getForms = () => api.get("/api/forms/");
    export const getForm = (id) => api.get(`/api/forms/${id}/`);
    export const submitResponse = (data) =>
    api.post('/api/responses/', data);

    export const createForm = (formData) =>
    api.post("/api/forms/", formData);

export default api;
