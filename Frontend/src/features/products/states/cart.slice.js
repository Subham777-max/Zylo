import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        loading: false,
        error: null,
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setIncreaseQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const cartItem = state.cart.products.find((item) => item.product._id === productId);
            if (cartItem) {
                cartItem.quantity += quantity;
            }
        },
        setDecreaseQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const cartItem = state.cart.products.find((item) => item.product._id === productId);
            if (cartItem) {
                cartItem.quantity -= quantity;
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setCart, setLoading, setError, setIncreaseQuantity, setDecreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;