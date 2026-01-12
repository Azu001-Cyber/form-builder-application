
import axios from "axios";

const authBase = "http://localhost:8000/api/auth";

export async function refreshToken() {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return null;
    const { data } = await axios.post(`${authBase}/refresh/`, { refresh });
    localStorage.setItem("access", data.access);
    return data.access;
}

export function logout() { 
    localStorage.removeItem("access"); 
    localStorage.removeItem("refresh"); 
    window.location.href = "/login"; // redirect to login page 
    }
