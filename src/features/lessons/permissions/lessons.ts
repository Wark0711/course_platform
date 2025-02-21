import { UserRole, lessonTable } from "@/drizzle/schema";
import { eq, or } from "drizzle-orm";

export function canCreateLessons({ role }: { role?: UserRole }) {
    return role === 'admin'
}

export function canUpdateLessons({ role }: { role?: UserRole }) {
    return role === 'admin'
}

export function canDeleteLessions({ role }: { role?: UserRole }) {
    return role === 'admin'
}

export const wherePublicLessons = or(eq(lessonTable.status, 'public'), eq(lessonTable.status, 'preview'))