import { db } from "@/drizzle/db";
import { courseSectionTable, courseTable, lessonTable, userCourseAccessTable } from "@/drizzle/schema";
import { revalidateCourseCache } from "./cache/cache";
import { asc, countDistinct, eq } from "drizzle-orm";

export async function insertCourse(data: typeof courseTable.$inferInsert) {
    const [newCourse] = await db.insert(courseTable).values(data).returning()
    if (newCourse == null) throw new Error("Failed to create new course");

    revalidateCourseCache(newCourse.id)
    return newCourse
}

export async function modifyCourse(id: string, data: typeof courseTable.$inferInsert) {
    const [updateCourse] = await db.update(courseTable).set(data).where(eq(courseTable.id, id)).returning()
    if (updateCourse == null) throw new Error("Failed to create new course");

    revalidateCourseCache(updateCourse.id)
    return updateCourse
}

export async function removeCourse(id: string) {
    const [deletedCourse] = await db.delete(courseTable).where(eq(courseTable.id, id)).returning()
    if (deletedCourse == null) throw new Error("Failed to delete course")

    revalidateCourseCache(deletedCourse.id)
    return deletedCourse
}

export async function getCourses() {
    return db
        .select({
            id: courseTable.id,
            name: courseTable.name,
            sectionsCount: countDistinct(courseSectionTable),
            lessonsCount: countDistinct(lessonTable),
            studentsCount: countDistinct(userCourseAccessTable),
        })
        .from(courseTable)
        .leftJoin(
            courseSectionTable,
            eq(courseSectionTable.courseId, courseTable.id)
        )
        .leftJoin(lessonTable, eq(lessonTable.sectionId, courseSectionTable.id))
        .leftJoin(
            userCourseAccessTable,
            eq(userCourseAccessTable.courseId, courseTable.id)
        )
        .orderBy(asc(courseTable.name))
        .groupBy(courseTable.id)
}

export async function getCourse(courseId: string) {
    return db.query.courseTable.findFirst({
        columns: { id: true, name: true, description: true },
        where: eq(courseTable.id, courseId),
        with: {
            courseSections: {
                orderBy: asc(courseSectionTable.order),
                columns: { id: true, status: true, name: true },
                with: {
                    lessons: {
                        orderBy: asc(lessonTable.order),
                        columns: {
                            id: true,
                            status: true,
                            name: true,
                            description: true,
                            youtubeVideoId: true,
                            sectionId: true
                        },
                    }
                }
            }
        }
    })
}