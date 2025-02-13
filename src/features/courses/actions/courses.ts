'use server'

import { z } from "zod";
import { courseSchema } from "../schema/courses";
import { redirect } from "next/navigation";
import { canCreateCourses, canDeleteteCourses } from "../permissions/courses";
import { getCurrentUser } from "@/services/clerk";
import { insertCourse } from "../db/courses";

export async function createCourse(unsafeData: z.infer<typeof courseSchema>) {
    const { success, data } = courseSchema.safeParse(unsafeData)
    if (!success || !canCreateCourses(await getCurrentUser())) {
        return {
            error: true, message: 'There was an error creating your course'
        }
    }

    const course = await insertCourse(data)
    redirect(`/admin/courses/${course.id}/edit`)

}

export async function deleteCourse(id: string) {
    if (!canDeleteteCourses(await getCurrentUser())) {
        return {
            error: true, message: 'There was an error deleting your course'
        }
    }

    // const course = await removeCourse(id)
    return {
        error: false, message: 'Successfully deleted your course'
    }
}