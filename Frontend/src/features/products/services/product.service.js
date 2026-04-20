import api from "../../api/api"

// Create product — only title + description (no images/price at product level)
export async function createProduct({ title, description }) {
    const response = await api.post("/products", { title, description });
    return response.data;
}

export async function getProductsCreatedByMe(){
    const response = await api.get("/products/my");
    return response.data;
}

export async function getAllProducts(){
    const response = await api.get("/products");
    return response.data;
}

export async function getProductById(id){
    const response = await api.get(`/products/${id}`);
    return response.data;
}

// Add variant to product
export async function addVariant(productId, payload) {
    const response = await api.post(`/products/${productId}/variant`, payload);
    return response.data;
}

export async function deleteProduct(id){
    const response = await api.delete(`/products/${id}`)
    return response.data
}

