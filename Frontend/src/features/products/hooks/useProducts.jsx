import { useDispatch, useSelector } from "react-redux";
import { createProduct, getProductById, getProductsCreatedByMe, deleteProduct, getAllProducts, addVariant } from "../services/product.service";
import { setProduct, setSellerProducts, setLoading, setError, setDeleting, setAllProducts, setVariantSaving, updateProductInCache } from "../states/produc.slice";

const CACHE_TIME = 1000 * 60 * 5;

export function useProducts() {
    const dispatch = useDispatch();
    const { sellerProducts, product, loading, error, productsById, allProducts, allProductsCache, sellerProductsCache, deleting, variantSaving } = useSelector((state) => state.products);

    // Create product — only title + description
    const handleCreateProduct = async ({ title, description }) => {
        try {
            dispatch(setLoading(true));
            const data = await createProduct({ title, description });
            dispatch(setProduct(data.product));
            return data.product;
        } catch (error) {
            dispatch(setError(error?.message ?? "Failed to create product"));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Add a variant to an existing product
    const handleAddVariant = async (productId, variantPayload) => {
        try {
            dispatch(setVariantSaving(true));

            // Build FormData to support image files
            const formData = new FormData();
            
            // Backend expects attributes as an object. In FormData, sending attributes[fieldName] 
            // naturally reconstructs into a Javascript object req.body.attributes in Express/Multer!
            if (variantPayload.attributes) {
                Object.entries(variantPayload.attributes).forEach(([key, val]) => {
                    formData.append(`attributes[${key}]`, val);
                });
            }

            formData.append("priceAmount", variantPayload.priceAmount);
            formData.append("priceCurrency", variantPayload.priceCurrency);
            formData.append("stock", variantPayload.stock ?? 0);
            
            if (variantPayload.images?.length) {
                variantPayload.images.forEach((file) => formData.append("images", file));
            }

            const data = await addVariant(productId, formData);
            
            // Re-fetch the product completely to ensure we have the fully populated product with images
            const freshData = await getProductById(productId);
            dispatch(updateProductInCache(freshData.product));
            
            return freshData.product;
        } catch (error) {
            dispatch(setError(error?.message ?? "Failed to add variant"));
            throw error;
        } finally {
            dispatch(setVariantSaving(false));
        }
    };

    const handleGetProductsCreatedByMe = async () => {
        try {
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
            dispatch(setError(error?.message ?? "Failed to load products"));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleGetProductById = async (id) => {
        try {
            const cached = productsById[id];
            if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
                dispatch(setProduct(cached.data));
                return;
            }
            dispatch(setLoading(true));
            const data = await getProductById(id);
            dispatch(setProduct(data.product));
        } catch (error) {
            dispatch(setError(error?.message ?? "Failed to load product"));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            dispatch(setDeleting(true));
            await deleteProduct(id);
            dispatch(setProduct(null));
        } catch (error) {
            dispatch(setError(error?.message ?? "Failed to delete product"));
        } finally {
            dispatch(setDeleting(false));
        }
    };

    const handleGetAllProducts = async () => {
        try {
            if (
                allProductsCache &&
                Date.now() - allProductsCache.timestamp < CACHE_TIME
            ) {
                dispatch(setAllProducts(allProductsCache.data));
                return;
            }
            dispatch(setLoading(true));
            const data = await getAllProducts();
            dispatch(setAllProducts(data.products));
        } catch (error) {
            dispatch(setError(error?.message ?? "Failed to load products"));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        sellerProducts,
        product,
        allProducts,
        loading,
        deleting,
        variantSaving,
        error,
        handleCreateProduct,
        handleAddVariant,
        handleGetProductsCreatedByMe,
        handleGetProductById,
        handleDeleteProduct,
        handleGetAllProducts,
    };
}
