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
            const { variantId, quantity } = action.payload;
            const getVariantId = (i) => (typeof i.variant === 'string' ? i.variant : i.variant?._id);
            const cartItem = state.cart.items?.find((item) => getVariantId(item) === variantId);
            if (cartItem) {
                cartItem.quantity += quantity;
                const getVariantObj = (i) => (typeof i?.variant === 'object' ? i?.variant : i?.product?.variants);
                const price = getVariantObj(cartItem)?.price?.amount || 0;
                if (state.cart.total !== undefined) {
                    state.cart.total += (price * quantity);
                }
            }
        },
        setDecreaseQuantity: (state, action) => {
            const { variantId, quantity } = action.payload;
            const getVariantId = (i) => (typeof i.variant === 'string' ? i.variant : i.variant?._id);
            const cartItem = state.cart.items?.find((item) => getVariantId(item) === variantId);
            if (cartItem) {
                cartItem.quantity -= quantity;
                const getVariantObj = (i) => (typeof i?.variant === 'object' ? i?.variant : i?.product?.variants);
                const price = getVariantObj(cartItem)?.price?.amount || 0;
                if (state.cart.total !== undefined) {
                    state.cart.total -= (price * quantity);
                }
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