import { UserRole } from "@/drizzle/schema";

export function canAccessAdminPages({ role }: { role?: UserRole }) {
    return role === 'admin'
}