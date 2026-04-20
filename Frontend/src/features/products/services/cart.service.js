import api from "../../api/api"

export async function getMyCart(){
    const response = await api.get("/carts");
    return response.data;
}

export async function addToCart(productId, variantId, quantity){
    const response = await api.post(`/carts/${productId}/${variantId}`,{quantity});
    return response.data;
}

export async function updateCart(productId, variantId, quantity){
    const response = await api.patch(`/carts/${productId}/${variantId}`,{quantity});
    return response.data;
}

export async function removeFromCart(productId, variantId){
    const response = await api.delete(`/carts/${productId}/${variantId}`);
    return response.data;
}