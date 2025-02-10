'use server'

import { z } from "zod";
import { courseSchema } from "../schema/courses";
import { redirect } from "next/navigation";

export async function createCourse(unsafeData: z.infer<typeof courseSchema>) {
    const { success, data } = courseSchema.safeParse(unsafeData)
    if (!success) {
        return {
            error: true, message: 'There was an error creating your course'
        }
    }

    // const course = await insertCourse(data)

    // redirect(`admin/courses/${course.id}/edit`)

}