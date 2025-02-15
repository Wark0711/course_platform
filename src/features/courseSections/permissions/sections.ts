import { UserRole } from "@/drizzle/schema";

export function canCreateCourseSections({ role }: { role?: UserRole }) {
    return role === 'admin'
}

export function canUpdateCourseSections({ role }: { role?: UserRole }) {
    return role === 'admin'
}

export function canDeleteteCourseSections({ role }: { role?: UserRole }) {
    return role === 'admin'
}