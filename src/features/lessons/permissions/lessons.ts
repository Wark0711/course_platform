import { UserRole } from "@/drizzle/schema";

export function canCreateLessons({ role }: { role?: UserRole }) {
    return role === 'admin'
}

export function canUpdateLessons({ role }: { role?: UserRole }) {
    return role === 'admin'
}

export function canDeleteLessions({ role }: { role?: UserRole }) {
    return role === 'admin'
}