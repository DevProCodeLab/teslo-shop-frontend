import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { GetProductById } from "../actions/get-product-by-id"
import { CreateUpdateProductAction } from "../actions/create-update-product.action";
import type { Product } from "@/interfaces/product.interface";


export const useProduct = (id: string) => {

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', { id, }],
        queryFn: () => GetProductById(id),
        retry: false,
        staleTime: 1000 * 60 * 5,
    });

    //ToDo mutación
    const mutation = useMutation({
        mutationFn: CreateUpdateProductAction,
        onSuccess: (product: Product) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] });
            //invalidar cache
            //actualizar queryData
            queryClient.setQueryData(['products', { id: product.id }], product);
        }
    });

    return {
        ...query,
        mutation
    }
}
