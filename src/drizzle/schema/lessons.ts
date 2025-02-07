import { pgTable, text, uuid, integer, pgEnum } from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelpers"
import { relations } from "drizzle-orm"
import { courseSectionTable } from "./courseSection"
import { userLessonCompleteTable } from "./userLessonComplete"

export const lessonStatuses = ["public", "private", "preview"] as const
export type LessonStatus = (typeof lessonStatuses)[number]
export const lessonStatusEnum = pgEnum("lesson_status", lessonStatuses)

export const lessonTable = pgTable("lessons", {
  id,
  name: text().notNull(),
  description: text(),
  youtubeVideoId: text().notNull(),
  order: integer().notNull(),
  status: lessonStatusEnum().notNull().default("private"),
  sectionId: uuid().notNull().references(() => courseSectionTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
})

export const lessonRelationships = relations(lessonTable, ({ one, many }) => ({
  section: one(courseSectionTable, {
    fields: [lessonTable.sectionId],
    references: [courseSectionTable.id],
  }),
  userLessonsComplete: many(userLessonCompleteTable),
}))