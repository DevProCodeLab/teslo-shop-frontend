import { useProducts } from "@/shop/hooks/useProducts"

import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"

export const HomePage = () => {
    const { data } = useProducts();

    return (
        <>
            <CustomJumbotron title="Teslo Style || Tienda de Ropa" />
            <ProductsGrid products={data?.products || []} />
            <CustomPagination totalPages={data?.pages || 0} />
        </>
    )
}
