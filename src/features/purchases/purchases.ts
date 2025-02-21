import { db } from "@/drizzle/db";
import { purchaseTable } from "@/drizzle/schema";
import { revalidatePurchaseCache } from "./db/cache";
import { eq } from "drizzle-orm";

export async function insertPurchase(data: typeof purchaseTable.$inferInsert, trx: Omit<typeof db, "$client"> = db) {
    const details = data.productDetails

    const [newPurchase] = await trx.insert(purchaseTable).values({
        ...data,
        productDetails: {
            name: details.name,
            description: details.description,
            imageUrl: details.imageUrl,
        }
    })
        .onConflictDoNothing()
        .returning()

    if (newPurchase != null) revalidatePurchaseCache(newPurchase)

    return newPurchase
}

export async function updatePurchase(
    id: string,
    data: Partial<typeof purchaseTable.$inferInsert>,
    trx: Omit<typeof db, "$client"> = db
) {
    const details = data.productDetails

    const [updatedPurchase] = await trx
        .update(purchaseTable)
        .set({
            ...data,
            productDetails: details
                ? {
                    name: details.name,
                    description: details.description,
                    imageUrl: details.imageUrl,
                }
                : undefined,
        })
        .where(eq(purchaseTable.id, id))
        .returning()
    if (updatedPurchase == null) throw new Error("Failed to update purchase")

    revalidatePurchaseCache(updatedPurchase)

    return updatedPurchase
}