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

export async function getCoursesForProduct() {
    return db.query.courseTable.findMany({
      orderBy: asc(courseTable.name),
      columns: { id: true, name: true },
    })
  }

export async function insertProduct(data: Partial<typeof productTable.$inferInsert> & { courseIds: string[] }) {

}

export async function modifyProduct(id: string, data: Partial<typeof productTable.$inferInsert> & { courseIds: string[] }) {

}

export async function removeProduct(id: string) {
    const [deletedProduct] = await db.delete(productTable).where(eq(productTable.id, id)).returning()
    if (deletedProduct == null) throw new Error("Failed to delete product")

    revalidateProductCache(deletedProduct.id)
    return deletedProduct
}