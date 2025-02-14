import { z } from "zod"
import { sectionSchema } from "../schema/sections"
import { getCurrentUser } from "@/services/clerk"


export async function createSection(courseId: string, unsafeData: z.infer<typeof sectionSchema>) {
    const { success, data } = sectionSchema.safeParse(unsafeData)
    // if (!success || !canCreateCourseSections(await getCurrentUser())) {
    //     return {
    //         error: true, message: 'There was an error creating section of your course'
    //     }
    // }

    // const course = await insertCourse(data)
    // redirect(`/admin/courses/${course.id}/edit`)

}