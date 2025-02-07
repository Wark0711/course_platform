import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core"
import { createdAt, updatedAt } from "../schemaHelpers"
import { relations } from "drizzle-orm"
import { userTable } from "./users"
import { lessonTable } from "./lessons"

export const userLessonCompleteTable = pgTable(
    "user_lesson_complete",
    {
        userId: uuid().notNull().references(() => userTable.id, { onDelete: "cascade" }),
        lessonId: uuid().notNull().references(() => lessonTable.id, { onDelete: "cascade" }),
        createdAt,
        updatedAt,
    },
    t => [primaryKey({ columns: [t.userId, t.lessonId] })]
)

export const userLessonCompleteRelationships = relations(userLessonCompleteTable, ({ one }) => ({
    user: one(userTable, {
        fields: [userLessonCompleteTable.userId],
        references: [userTable.id],
    }),
    lesson: one(lessonTable, {
        fields: [userLessonCompleteTable.lessonId],
        references: [lessonTable.id],
    }),
})
)