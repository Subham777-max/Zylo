import { useDispatch, useSelector } from "react-redux";
import { createProduct, getProductById, getProductsCreatedByMe } from "../services/product.service";
import { setProduct, setSellerProducts, setLoading, setError } from "../states/produc.slice";

export function useProducts() {
    const dispatch = useDispatch();
    const { sellerProducts, product, loading, error } = useSelector((state) => state.products);

    const handleCreateProduct = async (formData) => {
        try {
            dispatch(setLoading(true));
            const data = await createProduct(formData);
            dispatch(setProduct(data.product));
            return data.product;
        } catch (error) {
            dispatch(setError(error));
        }finally{
            dispatch(setLoading(false));
        }
    };

    const handleGetProductsCreatedByMe = async () => {
        try {
            dispatch(setLoading(true));
            const data = await getProductsCreatedByMe();
            dispatch(setSellerProducts(data.products));
        } catch (error) {
            dispatch(setError(error));
        }finally{
            dispatch(setLoading(false));
        }
    };

    const handleGetProductById = async (id) => {
        try {
            dispatch(setLoading(true));
            const data = await getProductById(id);
            dispatch(setProduct(data.product));
        } catch (error) {
            dispatch(setError(error));
        }finally{
            dispatch(setLoading(false));
        }
    };

    return {
        sellerProducts,
        product,
        loading,
        error,
        handleCreateProduct,
        handleGetProductsCreatedByMe,
        handleGetProductById,
    };
}
