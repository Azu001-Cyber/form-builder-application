import axios from "axios";

const API_URL = axios.create({ baseURL: "http://localhost:8000/api/"

});

export const getForms = () => API_URL.get("forms/");
export const getForm = (id) => API_URL.get(`formly/${id}/`);
export const submitResponse = (formId, data) =>
  API_URL.post(`forms/${formId}/responses/`, data)


export const createForm = (formData, token) =>
  API_URL.post("forms/", formData, {
    headers: {
      Authorization: `Bearer ${token}`, // JWT or session token
    },
  });

export default API_URL;

