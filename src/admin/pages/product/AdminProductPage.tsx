
import { Navigate, useNavigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreamLoading } from '@/components/custom/CustomFullScreamLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';


export const AdminProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { isLoading, isError, data: product, mutation } = useProduct(id || '');

    const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
    const subtitle =
        id === 'new'
            ? 'Aquí puedes crear un nuevo producto.'
            : 'Aquí puedes editar el producto.';

    const handleSubmit = async (productLike: Partial<Product> & { files?: File[] }) => {
        await mutation.mutateAsync(productLike, {
            onSuccess: (data) => {
                toast.success(productLike.id === 'new' ? 'Producto creado correctamente'
                    : 'Producto actualizado correctamente', { position: 'top-right' });
                navigate(`/admin/products/${data.id}`)
            },
            onError: (error) => {
                console.log(error);
                toast.error(productLike.id === 'new' ? 'error al crear el producto'
                    : 'error al actualizar el producto', { position: 'top-right' })
            }
        });
    };

    if (isError) return <Navigate to="/admin/products" />;

    if (isLoading) return <CustomFullScreamLoading />;

    if (!product) return <Navigate to='/admin/products' />;

    return <ProductForm
        title={title}
        subTitle={subtitle}
        isPending={mutation.isPending}
        product={product}
        onSubmit={handleSubmit}
    />
};