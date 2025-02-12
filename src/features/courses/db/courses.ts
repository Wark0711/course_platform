import { db } from "@/drizzle/db";
import { courseTable } from "@/drizzle/schema";
import { revalidateCourseCache } from "./cache/cache";

export async function insertCourse(data: typeof courseTable.$inferInsert) {
    const [newCourse] = await db.insert(courseTable).values(data).returning()
    if (newCourse == null) throw new Error("Failed to create new course");

    revalidateCourseCache(newCourse.id)
    return newCourse
}