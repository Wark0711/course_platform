"use server"

import { z } from "zod"
import { lessonSchema } from "../schema/lessons"
import { getCurrentUser } from "@/services/clerk"
import { canCreateLessons, canDeleteLessions, canUpdateLessons } from "../permissions/lessons"
import { getNextCourseLessonOrder, insertLesson, modifyLesson, modifyLessonOrders, removeLesson } from "../db/lessons"

export async function createLesson(unsafeData: z.infer<typeof lessonSchema>) {
    const { success, data } = lessonSchema.safeParse(unsafeData)

    if (!success || canCreateLessons(await getCurrentUser())) {
        return { error: true, message: "There was an error creating your lesson" }
    }

    const order = await getNextCourseLessonOrder(data.sectionId)

    await insertLesson({ ...data, order })
    return { error: false, message: "Successfully created your lesson" }
}

export async function updateLesson(id: string, unsafeData: z.infer<typeof lessonSchema>) {
    const { success, data } = lessonSchema.safeParse(unsafeData)

    if (!success || !canUpdateLessons(await getCurrentUser())) {
        return { error: true, message: "There was an error updating your lesson" }
    }

    await modifyLesson(id, data)
    return { error: false, message: "Successfully updated your lesson" }
}

export async function deleteLesson(id: string) {
    if (!canDeleteLessions(await getCurrentUser())) {
        return { error: true, message: "Error deleting your lesson" }
    }

    await removeLesson(id)
    return { error: false, message: "Successfully deleted your lesson" }
}

export async function updateLessonOrders(lessonIds: string[]) {
    if (lessonIds.length === 0 || !canUpdateLessons(await getCurrentUser())) {
        return { error: true, message: "Error reordering your lessons" }
    }

    await modifyLessonOrders(lessonIds)
    return { error: false, message: "Successfully reordered your lessons" }
}