import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth.slice";
import productReducer from "../features/products/states/produc.slice";
import cartReducer from "../features/products/states/cart.slice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
    }
})