import { useDispatch, useSelector } from "react-redux";
import { addToCart, getMyCart, removeFromCart, updateCart } from "../services/cart.service";
import { setCart, setLoading, setError } from "../states/cart.slice";

export function useCart(){
    const dispatch = useDispatch();
    const { cart, loading, error } = useSelector((state) => state.cart);

    const handleGetMyCart = async () => {
        try {
            dispatch(setLoading(true));
            const data = await getMyCart();
            dispatch(setCart(data.cart));
        } catch (error) {
            dispatch(setError(error));
        }finally{
            dispatch(setLoading(false));
        }
    };

    const handleAddToCart = async (productId, quantity) => {
        try {
            dispatch(setLoading(true));
            const data = await addToCart(productId, quantity);
            dispatch(setCart(data.cart));
        } catch (error) {
            dispatch(setError(error));
        }finally{
            dispatch(setLoading(false));
        }
    };

    const handleUpdateCart = async (productId, quantity) => {
        try {
            dispatch(setLoading(true));
            const data = await updateCart(productId, quantity);
            dispatch(setCart(data.cart));
        } catch (error) {
            dispatch(setError(error));
        }finally{
            dispatch(setLoading(false));
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            dispatch(setLoading(true));
            const data = await removeFromCart(productId);
            dispatch(setCart(data.cart));
        } catch (error) {
            dispatch(setError(error));
        }finally{
            dispatch(setLoading(false));
        }
    };

    return {
        cart,
        loading,
        error,
        handleGetMyCart,
        handleAddToCart,
        handleUpdateCart,
        handleRemoveFromCart
    };
}