import api from "../../api/api.js";

export async function register({ email, contact, password, fullName, isSeller}){
    const response = await api.post("/auth/register", { email, contact, password, fullName, isSeller });
    return response.data;
}

export async function login({ email, password}){
    const response = await api.post("/auth/login", { email, password });
    return response.data;
}

export async function getMe(){
    const response = await api.get("/auth/me");
    return response.data;
}