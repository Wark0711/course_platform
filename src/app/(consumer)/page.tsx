import { ProductCard } from "@/features/products/components/ProductCard"
import { getProductsForConsumers } from "@/features/products/db/products"

export default async function ConsumerHome() {

    const products = await getProductsForConsumers()

    return (
        <div className="my-6 px-3">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
                {
                    products?.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))
                }
            </div>
        </div>
    )
}