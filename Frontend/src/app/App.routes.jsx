import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import ProtectedRoutes from "../components/utils/ProtectedRoutes";
import SellerRoutes from "../components/utils/SellerRoutes";
import CreateProductPage from "../features/products/pages/CreateProductPage";
import MainLayout from "../components/layouts/MainLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
        children: [
            {
                index: true,
                element: <h1 style={{ paddingLeft: "2rem", paddingTop: "2rem", color: "var(--color-on-surface)" }}>Home</h1>,
            },
            // Add more navbar-wrapped pages here
        ],
    },
    // ── Seller pages (no navbar) ───────────────────────────────────────────────
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

