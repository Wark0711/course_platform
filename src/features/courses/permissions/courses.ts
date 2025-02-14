import { UserRole } from "@/drizzle/schema";

export function canCreateCourses({ role }: { role?: UserRole }) {
    return role === 'admin'
}

export function canUpdateCourses({ role }: { role?: UserRole }) {
    return role === 'admin'
}

export function canDeleteteCourses({ role }: { role?: UserRole }) {
    return role === 'admin'
}