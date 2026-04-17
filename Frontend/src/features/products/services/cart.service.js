import api from "../../api/api"

export async function getMyCart(){
    const response = await api.get("/carts");
    return response.data;
}

export async function addToCart(productId, quantity){
    const response = await api.post("/carts",{productId,quantity});
    return response.data;
}

export async function updateCart(productId, quantity){
    const response = await api.patch("/carts",{productId,quantity});
    return response.data;
}

export async function removeFromCart(productId){
    const response = await api.delete(`/carts/${productId}`);
    return response.data;
}