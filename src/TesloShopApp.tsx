import type { PropsWithChildren } from "react"
import { RouterProvider } from "react-router/dom"
import { appRouter } from "./app.router"
import { useAuthStore } from "./auth/store/auth.store"

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import { CustomFullScreamLoading } from "./components/custom/CustomFullScreamLoading"



const queryClient = new QueryClient();

export const TesloShopApp = () => {

    const { checkAuthStatus } = useAuthStore();
    const CheckAuthProvider = ({ children }: PropsWithChildren) => {
        const { isLoading } = useQuery({
            queryKey: ['auth'],
            queryFn: checkAuthStatus,
            retry: false,
            refetchInterval: 1000 * 60 * 1.5,
            refetchOnWindowFocus: true,
        });

        if (isLoading) return <CustomFullScreamLoading />;
        return children;
    }

    return (

        <QueryClientProvider client={queryClient}>
            <Toaster />
            <CheckAuthProvider>
                <RouterProvider router={appRouter} />
            </CheckAuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
