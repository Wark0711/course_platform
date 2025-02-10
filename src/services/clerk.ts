import { db } from "@/drizzle/db";
import { UserRole, userTable } from "@/drizzle/schema";
import { getUserIdTag } from "@/features/users/db/cache";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

const client = await clerkClient()

export async function getCurrentUser({ allData = false } = {}) {
    const { userId, sessionClaims, redirectToSignIn } = await auth()

    return {
        clerkUserId: userId,
        userId: sessionClaims?.dbId,
        role: sessionClaims?.role,
        user: allData && sessionClaims?.dbId != null ? await getUser(sessionClaims?.dbId) : undefined,
        redirectToSignIn
    }
}

export async function syncClerkUserMetadata(user: {
    id: string,
    clerkUserId: string,
    role: UserRole
}) {
    return client.users.updateUserMetadata(user.clerkUserId, {
        publicMetadata: {
            dbId: user.id,
            role: user.role
        }
    })
}

async function getUser(id: string) {
    // Usable only in canary version of nextjs
    // 'use cache'
    // cacheTag(getUserIdTag(id))

    return db.query.userTable.findFirst({
        where: eq(userTable.id, id)
    })
}