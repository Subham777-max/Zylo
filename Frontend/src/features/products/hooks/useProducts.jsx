import { useDispatch, useSelector } from "react-redux";
import { createProduct, getProductById, getProductsCreatedByMe } from "../services/product.service";
import { setProduct, setSellerProducts, setLoading, setError } from "../states/produc.slice";

const CACHE_TIME = 1000 * 60 * 5;

export function useProducts() {
    const dispatch = useDispatch();
    const { sellerProducts, product, loading, error, productsById, sellerProductsCache } = useSelector((state) => state.products);

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
            //using cache
            if (
                sellerProductsCache &&
                Date.now() - sellerProductsCache.timestamp < CACHE_TIME
            ) {
                dispatch(setSellerProducts(sellerProductsCache.data));
                return;
            }
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
            const cached = productsById[id];

            //useing cache
            if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
                dispatch(setProduct(cached.data));
                return;
            }

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
