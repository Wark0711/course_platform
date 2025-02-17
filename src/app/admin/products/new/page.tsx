import { PageHeader } from "@/components/PageHeader";
import { ProductForm } from "@/features/products/components/ProductForm";
import { getCoursesForProduct } from "@/features/products/db/products";

export default async function NewProductPage() {

    const courses = await getCoursesForProduct()

    return (
        <div className="my-6 px-3">
            <PageHeader title="New Product" />
            <ProductForm courses={courses} />
        </div>
    )
}