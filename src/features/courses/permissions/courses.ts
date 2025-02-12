import { UserRole } from "@/drizzle/schema";

export function canCreateCourses({ role }: { role?: UserRole }) {
    return role === 'admin'
}