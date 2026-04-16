import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        sellerProducts: [],
        product: null,
        //cache
        productsById: {},          // cache for individual products
        sellerProductsCache: null, // cache for seller products
        loading: false,
        deleting: false,
        error: null,
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload;

            //caching
            state.sellerProductsCache = {
                data: action.payload,
                timestamp: Date.now(),
            };
        },
        setProduct: (state, action) => {
            const product = action.payload;
            state.product = product;

            //caching
            state.productsById[product._id] = {
                data: product,
                timestamp: Date.now(),
            };
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setDeleting: (state, action) => {
            state.deleting = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setProduct,setSellerProducts, setLoading, setDeleting, setError } = productSlice.actions;
export default productSlice.reducer;