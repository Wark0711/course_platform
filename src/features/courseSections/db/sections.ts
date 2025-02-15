import { db } from "@/drizzle/db";
import { courseSectionTable } from "@/drizzle/schema";
import { revalidateCourseSectionCache } from "./cache";
import { eq } from "drizzle-orm";

export async function getNextCourseSectionOrder(courseId: string) {
    const section = await db.query.courseSectionTable.findFirst({
        columns: { order: true },
        where: ({ courseId: courseIdCol }, { eq }) => eq(courseIdCol, courseId),
        orderBy: ({ order }, { desc }) => desc(order),
    })

    return section ? section.order + 1 : 0
}

export async function insertSection(data: typeof courseSectionTable.$inferInsert) {
    const [newSection] = await db.insert(courseSectionTable).values(data).returning()
    if (newSection == null) throw new Error("Failed to create section");

    revalidateCourseSectionCache({
        courseId: newSection.courseId,
        id: newSection.id
    })

    return newSection
}

export async function modifySection(id: string, data: Partial<typeof courseSectionTable.$inferInsert>) {
    const [updateSection] = await db.update(courseSectionTable).set(data).where(eq(courseSectionTable.id, id)).returning()
    if (updateSection == null) throw new Error("Failed to modify section");

    revalidateCourseSectionCache({
        courseId: updateSection.courseId,
        id: updateSection.id
    })
    return updateSection
}

export async function removeSection(id: string) {
    const [deletedSection] = await db.delete(courseSectionTable).where(eq(courseSectionTable.id, id)).returning()
    if (deletedSection == null) throw new Error("Failed to delete section")

    revalidateCourseSectionCache({
        courseId: deletedSection.courseId,
        id: deletedSection.id
    })
    return deletedSection
}

export async function modifySectionOrders(sectionIds: string[]) {
    const sections = await Promise.all(
        sectionIds.map((id, index) =>
            db
                .update(courseSectionTable)
                .set({ order: index })
                .where(eq(courseSectionTable.id, id))
                .returning({
                    courseId: courseSectionTable.courseId,
                    id: courseSectionTable.id,
                })
        )
    )

    sections.flat().forEach(({ id, courseId }) => {
        revalidateCourseSectionCache({
            courseId,
            id,
        })
    })
}