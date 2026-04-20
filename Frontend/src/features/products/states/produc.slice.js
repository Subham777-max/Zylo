import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        sellerProducts: [],
        allProducts: [],
        product: null,
        // cache
        productsById: {},          // cache for individual products
        sellerProductsCache: null, // cache for seller products
        allProductsCache: null,    // cache for all products
        loading: false,
        deleting: false,
        variantSaving: false,      // separate flag for variant creation
        error: null,
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload;
            state.sellerProductsCache = {
                data: action.payload,
                timestamp: Date.now(),
            };
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload;
            state.allProductsCache = {
                data: action.payload,
                timestamp: Date.now(),
            };
        },
        setProduct: (state, action) => {
            const product = action.payload;
            state.product = product;
            // Guard: only cache if product is not null (e.g. after delete)
            if (product && product._id) {
                state.productsById[product._id] = {
                    data: product,
                    timestamp: Date.now(),
                };
            }
        },
        // Update a product in-place after a variant is added — avoids full re-fetch
        updateProductInCache: (state, action) => {
            const product = action.payload;
            if (!product || !product._id) return;
            state.product = product;
            state.productsById[product._id] = {
                data: product,
                timestamp: Date.now(),
            };
            // Also bust the seller products list cache so next visit re-fetches
            state.sellerProductsCache = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setDeleting: (state, action) => {
            state.deleting = action.payload;
        },
        setVariantSaving: (state, action) => {
            state.variantSaving = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setProduct,
    setSellerProducts,
    setAllProducts,
    setLoading,
    setDeleting,
    setVariantSaving,
    setError,
    updateProductInCache,
} = productSlice.actions;
export default productSlice.reducer;