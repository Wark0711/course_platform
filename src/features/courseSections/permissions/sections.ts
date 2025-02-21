import { UserRole, courseSectionTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export function canCreateCourseSections({ role }: { role?: UserRole }) {
    return role === 'admin'
}

export function canUpdateCourseSections({ role }: { role?: UserRole }) {
    return role === 'admin'
}

export function canDeleteteCourseSections({ role }: { role?: UserRole }) {
    return role === 'admin'
}

export const wherePublicCourseSections = eq(courseSectionTable.status, 'public')