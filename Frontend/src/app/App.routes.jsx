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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
        children: [
            {
                index: true,
                element: <h1 style={{ paddingLeft: "2rem", paddingTop: "2rem", color: "var(--color-on-surface)" }}>Home</h1>,
            },
            // ── Shared product details — any authenticated user ────────────────
            {
                path: "products/:id",
                element: <ProductDetailsPage />,
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
    // ── Create product — no navbar, full-page ──────────────────────────────────
    {
        path: "/seller/create-product",
        element: <ProtectedRoutes><SellerRoutes><CreateProductPage /></SellerRoutes></ProtectedRoutes>,
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
