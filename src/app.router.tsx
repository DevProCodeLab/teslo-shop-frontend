import { createHashRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layouts/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { ProductPage } from "./shop/pages/product/ProductPage";
import { GenderPage } from "./shop/pages/gender/GenderPage";

import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";

import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import { lazy } from "react";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";
import { AdminRoute, NotAuthenticatedRoutes } from "./components/routes/ProtectedRoutes";

const AdminLayout = lazy(() => import('./admin/layout/AdminLayout'));
const AuthLayout = lazy(() => import('./auth/layout/AuthLayout'));

export const appRouter = createHashRouter([
    // export const appRouter = createBrowserRouter([
    //public routes
    {
        path: '/',
        element: <ShopLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'product/:idSlug',
                element: <ProductPage />,
            },
            {
                path: 'gender/:gender',
                element: <GenderPage />,
            }
        ]
    },
    //Auth routes
    {
        path: '/auth',
        element:
            <NotAuthenticatedRoutes>
                <AuthLayout />
            </NotAuthenticatedRoutes>,
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            }
        ]
    },
    //Admin routes
    {
        path: '/admin',
        element:
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: 'products',
                element: <AdminProductsPage />
            },
            {
                path: 'products/:id',
                element: <AdminProductPage />
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" />,
    }

])