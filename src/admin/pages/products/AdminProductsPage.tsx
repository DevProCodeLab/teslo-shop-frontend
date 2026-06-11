import { PencilIcon, PlusIcon } from "lucide-react"
import { Link } from "react-router"
import { useProducts } from "@/shop/hooks/useProducts"
import { currencyFormatter } from "@/lib/currency-formatter"

import { AdminTilte } from "@/admin/components/AdminTilte"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { CustomFullScreamLoading } from "@/components/custom/CustomFullScreamLoading"

export const AdminProductsPage = () => {

    const { data, isLoading } = useProducts();

    if (isLoading) return <CustomFullScreamLoading />;

    return (
        <>

            <div className="flex justify-between items-center">
                <AdminTilte title="Productos" subtitle="ver y administrar tus productos." />

                <div className="flex justify-end mb-10 gap-4">
                    <Link to="/admin/products/new">
                        <Button>
                            <PlusIcon />
                            Crear producto
                        </Button>
                    </Link>
                </div>
            </div>

            <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
                <TableHeader>
                    <TableRow>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>precio</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Inventario</TableHead>
                        <TableHead>Tallas</TableHead>
                        <TableHead className="text-center">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <img src={product.images[0].toString()}
                                        alt={product.title}
                                        className="w-20 h-20 object-cover rounded-md" />
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin/products/${product.id}`}
                                        className="hover:text-blue-500 underline">
                                        {product.title}
                                    </Link>
                                </TableCell>
                                <TableCell>{currencyFormatter(product.price)}</TableCell>
                                <TableCell>{product.gender}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>{product.sizes.join(' - ')}</TableCell>
                                <TableCell className="text-center">
                                    <Link to={`/admin/products/${product.id}`} >
                                        <PencilIcon className="w-4 h-4 text-blue-500" />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
            <CustomPagination totalPages={data?.pages || 0} />
        </>
    )
}
