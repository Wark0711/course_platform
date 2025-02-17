import { db } from "@/drizzle/db";
import { courseProductTable, courseTable, productTable, purchaseTable } from "@/drizzle/schema";
import { asc, countDistinct, eq } from "drizzle-orm";
import { revalidateProductCache } from "./cache";

export async function getProducts() {
    return db
        .select({
            id: productTable.id,
            name: productTable.name,
            status: productTable.status,
            priceInDollars: productTable.priceInDollars,
            description: productTable.description,
            imageUrl: productTable.imageUrl,
            coursesCount: countDistinct(courseProductTable.courseId),
            customersCount: countDistinct(purchaseTable.userId),
        })
        .from(productTable)
        .leftJoin(purchaseTable, eq(purchaseTable.productId, productTable.id))
        .leftJoin(courseProductTable, eq(courseProductTable.productId, productTable.id))
        .orderBy(asc(productTable.name))
        .groupBy(productTable.id)
}

export async function getProduct(id: string) {
    return db.query.productTable.findFirst({
      columns: {
        id: true,
        name: true,
        description: true,
        priceInDollars: true,
        status: true,
        imageUrl: true,
      },
      where: eq(productTable.id, id),
      with: { courseProducts: { columns: { courseId: true } } },
    })
  }

export async function getCoursesForProduct() {
    return db.query.courseTable.findMany({
        orderBy: asc(courseTable.name),
        columns: { id: true, name: true },
    })
}

export async function insertProduct(data: typeof productTable.$inferInsert & { courseIds: string[] }) {
    const newProduct = await db.transaction(async trx => {
        const [newProduct] = await trx.insert(productTable).values(data).returning()
        if (newProduct == null) {
            trx.rollback()
            throw new Error("Failed to create product");
        }

        await trx.insert(courseProductTable).values(data.courseIds.map(courseId => ({ productId: newProduct.id, courseId })))
        return newProduct
    })

    revalidateProductCache(newProduct.id)
    return newProduct
}

export async function modifyProduct(id: string, data: Partial<typeof productTable.$inferInsert> & { courseIds: string[] }) {
    const updateProduct = await db.transaction(async trx => {
        const [updateProduct] = await trx.update(productTable).set(data).where(eq(productTable.id, id)).returning()
        if (updateProduct == null) {
            trx.rollback()
            throw new Error("Failed to update product");
        }

        await trx.delete(courseProductTable).where(eq(courseProductTable.productId, updateProduct.id))
        await trx.insert(courseProductTable).values(data.courseIds.map(courseId => ({ productId: updateProduct.id, courseId })))
        
        return updateProduct
    })

    revalidateProductCache(updateProduct.id)
    return updateProduct
}

export async function removeProduct(id: string) {
    const [deletedProduct] = await db.delete(productTable).where(eq(productTable.id, id)).returning()
    if (deletedProduct == null) throw new Error("Failed to delete product")

    revalidateProductCache(deletedProduct.id)
    return deletedProduct
}