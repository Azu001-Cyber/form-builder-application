
import axios from "axios";

const authBase = "http://localhost:8000/api/auth";

export async function refreshToken() {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return null;
    try{
        const { data } = await axios.post(`${authBase}/refresh/`, { refresh });
        localStorage.setItem("access", data.access);
        return data.access;

    }catch (err){
        console.error("Refresh failed", err);
        logout()
        return null
    }
}

export function logout() { 
    localStorage.removeItem("access"); 
    localStorage.removeItem("refresh"); 
    window.location.href = "/login"; // redirect to login page 
    }

export const isAuthenticated = () => {
    return !!localStorage.getItem('access');
};
