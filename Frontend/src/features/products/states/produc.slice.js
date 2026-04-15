import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        sellerProducts: [],
        product: null,
        loading: false,
        error: null,
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload;
        },
        setProduct: (state, action) => {
            state.product = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setProducts,setProduct,setSellerProducts, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;