import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import ProtectedRoutes from "../components/utils/ProtectedRoutes";
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
            // Add more protected routes here as children of MainLayout
        ],
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    }
])