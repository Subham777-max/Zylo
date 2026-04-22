import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import ProtectedRoutes from "../components/utils/ProtectedRoutes";
import SellerRoutes from "../components/utils/SellerRoutes";
import CreateProductPage from "../features/products/pages/CreateProductPage";
import MainLayout from "../components/layouts/MainLayout";
import SellerLayout from "../components/layouts/SellerLayout";
import MyProductPage from "../features/products/pages/MyProductPage";
import ProductDetailsPage from "../features/products/pages/ProductDetailsPage";
import SellerProductDetailsPage from "../features/products/pages/SellerProductDetailsPage";
import CartPage from "../features/products/pages/CartPage";
import HomePage from "../features/products/pages/HomePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            // ── Shared product details — any authenticated user ────────────────
            {
                path: "products/:id",
                element: <ProductDetailsPage />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },

            // ── Seller section (Navbar + Sidebar) ─────────────────────────────
            {
                path: "seller",
                element: <SellerRoutes><SellerLayout /></SellerRoutes>,
                children: [
                    {
                        path: "dashboard",
                        element: <h1 style={{ padding: "2rem", color: "var(--color-on-surface)" }}>Seller Dashboard</h1>,
                    },
                    {
                        path: "products",
                        element: <MyProductPage />,
                    },
                    {
                        path: "products/:id",
                        element: <SellerProductDetailsPage />,
                    },
                    {
                        path: "orders",
                        element: <h1 style={{ padding: "2rem", color: "var(--color-on-surface)" }}>Orders</h1>,
                    },
                    {
                        path: "analytics",
                        element: <h1 style={{ padding: "2rem", color: "var(--color-on-surface)" }}>Analytics</h1>,
                    },
                    {
                        path: "settings",
                        element: <h1 style={{ padding: "2rem", color: "var(--color-on-surface)" }}>Settings</h1>,
                    },
                ],
            },
            // Add more navbar-wrapped pages here
        ],
    },
    // ── Auth pages ─────────────────────────────────────────────────────────────
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    }
])
