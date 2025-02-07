import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelpers"
import { courseTable } from "./courses"
import { relations } from "drizzle-orm"
import { lessonTable } from "./lessons"

export const courseSectionStatuses = ["public", "private"] as const
export type CourseSectionStatus = (typeof courseSectionStatuses)[number]
export const courseSectionStatusEnum = pgEnum("course_section_status", courseSectionStatuses)

export const courseSectionTable = pgTable("course_sections", {
    id,
    name: text().notNull(),
    status: courseSectionStatusEnum().notNull().default("private"),
    order: integer().notNull(),
    courseId: uuid().notNull().references(() => courseTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
})

export const courseSectionRelationships = relations(courseSectionTable, ({ many, one }) => ({
    course: one(courseTable, {
        fields: [courseSectionTable.courseId],
        references: [courseTable.id],
    }),
    lessons: many(lessonTable),
})
)