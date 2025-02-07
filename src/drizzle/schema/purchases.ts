import { pgTable, integer, jsonb, uuid, text, timestamp } from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelpers"
import { relations } from "drizzle-orm"
import { userTable } from "./users"
import { productTable } from "./products"

export const purchaseTable = pgTable("purchases", {
    id,
    pricePaidInCents: integer().notNull(),
    productDetails: jsonb().notNull().$type<{ name: string; description: string; imageUrl: string }>(),
    userId: uuid().notNull().references(() => userTable.id, { onDelete: "restrict" }),
    productId: uuid().notNull().references(() => productTable.id, { onDelete: "restrict" }),
    stripeSessionId: text().notNull().unique(),
    refundedAt: timestamp({ withTimezone: true }),
    createdAt,
    updatedAt,
})

export const purchaseRelationships = relations(purchaseTable, ({ one }) => ({
    user: one(userTable, {
        fields: [purchaseTable.userId],
        references: [userTable.id],
    }),
    product: one(productTable, {
        fields: [purchaseTable.productId],
        references: [productTable.id],
    }),
}))