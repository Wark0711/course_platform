import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { courseTable } from "./courses";
import { productTable } from "./products";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";

export const courseProductTable = pgTable('course_products', {
    courseId: uuid().notNull().references(() => courseTable.id, { onDelete: 'restrict' }),
    productId: uuid().notNull().references(() => productTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt
},
    t => [primaryKey({ columns: [t.courseId, t.productId] })])

export const courseProductRelationships = relations(courseProductTable, ({ one }) => ({
    course: one(courseTable, {
        fields: [courseProductTable.courseId],
        references: [courseTable.id]
    }),
    product: one(productTable, {
        fields: [courseProductTable.productId],
        references: [productTable.id]
    })
}))