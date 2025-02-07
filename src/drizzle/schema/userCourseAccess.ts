import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core"
import { createdAt, updatedAt } from "../schemaHelpers"
import { relations } from "drizzle-orm"
import { userTable } from "./users"
import { courseTable } from "./courses"

export const userCourseAccessTable = pgTable("user_course_access", {
    userId: uuid().notNull().references(() => userTable.id, { onDelete: "cascade" }),
    courseId: uuid().notNull().references(() => courseTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
},
    t => [primaryKey({ columns: [t.userId, t.courseId] })]
)

export const userCourseAccessRelationships = relations(userCourseAccessTable, ({ one }) => ({
    user: one(userTable, {
        fields: [userCourseAccessTable.userId],
        references: [userTable.id],
    }),
    course: one(courseTable, {
        fields: [userCourseAccessTable.courseId],
        references: [courseTable.id],
    }),
})
)