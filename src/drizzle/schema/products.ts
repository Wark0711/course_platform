import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, name, updatedAt } from "../schemaHelpers";
import { courseProductTable } from "./courseProducts";

export const productStatuses = ['public', 'private'] as const
export type ProductStatus = (typeof productStatuses)[number]
export const productStatusEnum = pgEnum('product_status', productStatuses)

export const productTable = pgTable('products', {
    id,
    name,
    description: text().notNull(),
    imageUrl: text().notNull(),
    priceInDollars: integer().notNull(),
    status: productStatusEnum().notNull().default('private'),
    createdAt,
    updatedAt
})

export const productRelationships = relations(productTable, ({ many }) => ({
    courseProducts: many(courseProductTable)
}))