import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        sellerProducts: [],
        allProducts: [],
        product: null,
        //cache
        productsById: {},          // cache for individual products
        sellerProductsCache: null, // cache for seller products
        allProductsCache: null, // cache for all products
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
        setAllProducts: (state, action) => {
            state.allProducts = action.payload;

            //caching
            state.allProductsCache = {
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

export const { setProduct,setSellerProducts,setAllProducts, setLoading, setDeleting, setError } = productSlice.actions;
export default productSlice.reducer;