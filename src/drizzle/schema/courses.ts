import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, name, updatedAt } from "../schemaHelpers";
import { courseProductTable } from "./courseProducts";
import { userCourseAccessTable } from "./userCourseAccess";
import { courseSectionTable } from "./courseSection";

export const courseTable = pgTable('courses', {
    id,
    name,
    description: text().notNull(),
    createdAt,
    updatedAt
})

export const courseRelationships = relations(courseTable, ({ many }) => ({
    courseProducts: many(courseProductTable),
    userCourseAccesses: many(userCourseAccessTable),
    courseSections: many(courseSectionTable),
}))