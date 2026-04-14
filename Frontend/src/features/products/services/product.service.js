import api from "../../api/api"

export async function createProduct(formData){
    const response = await api.post("/products", formData);
    return response.data;
}

export async function getProductsCreatedByMe(){
    const response = await api.get("/products/my");
    return response.data;
}

export async function getProductById(id){
    const response = await api.get(`/products/${id}`);
    return response.data;
}

// export async function updateProduct(id, data){
//     const response = await api.put(`/products/${id}`, data)
//     return response.data
// }

// export async function deleteProduct(id){
//     const response = await api.delete(`/products/${id}`)
//     return response.data
// }
