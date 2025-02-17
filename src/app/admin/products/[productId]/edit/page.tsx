import { PageHeader } from "@/components/PageHeader";
import { ProductForm } from "@/features/products/components/ProductForm";
import { getCoursesForProduct, getProduct } from "@/features/products/db/products";
import { notFound } from "next/navigation";

export default async function EditProduct({ params }: { params: Promise<{ productId: string }> }) {

    const { productId } = await params
    const product = await getProduct(productId)

    if (product == null) return notFound()

    return (
        <div className="px-3 my-6">
            <PageHeader title="New Product" />
            <ProductForm product={{ ...product, courseIds: product.courseProducts.map(c => c.courseId) }} courses={await getCoursesForProduct()} />
        </div>
    )
}