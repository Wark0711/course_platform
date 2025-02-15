'use server'

import { z } from "zod"
import { sectionSchema } from "../schema/sections"
import { getCurrentUser } from "@/services/clerk"
import { canCreateCourseSections, canDeleteteCourseSections, canUpdateCourseSections } from "../permissions/sections"
import { getNextCourseSectionOrder, insertSection, modifySection, removeSection } from "../db/sections"


export async function createSection(courseId: string, unsafeData: z.infer<typeof sectionSchema>) {
    const { success, data } = sectionSchema.safeParse(unsafeData)
    if (!success || !canCreateCourseSections(await getCurrentUser())) {
        return { error: true, message: 'There was an error creating section of your course' }
    }

    const order = await getNextCourseSectionOrder(courseId)

    await insertSection({ ...data, courseId, order })
    return { error: false, message: 'Successfully created section of your course' }
}

export async function updateSection(id: string, unsafeData: z.infer<typeof sectionSchema>) {
    const { success, data } = sectionSchema.safeParse(unsafeData)
    if (!success || !canUpdateCourseSections(await getCurrentUser())) {
        return { error: true, message: 'There was an error updating section of your course' }
    }

    await modifySection(id, data)
    return { error: false, message: 'Successfully updated section of your course' }
}

export async function deleteSection(id: string) {
    if (!canDeleteteCourseSections(await getCurrentUser())) {
        return { error: true, message: 'There was an error deleting section of your course' }
    }

    await removeSection(id)
    return { error: false, message: 'Successfully deleted section of your course' }
}