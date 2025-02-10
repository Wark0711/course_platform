import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateUserCache } from "./cache";

export async function insertUser(data: typeof userTable.$inferInsert) {
    const [newUser] = await db.insert(userTable).values(data).returning().onConflictDoUpdate({
        target: [userTable.clerkUserId],
        set: data
    })

    if (newUser == null) throw new Error("Failed to create new user");
    revalidateUserCache(newUser.id)

    return newUser
}

export async function updateUser({ clerkUserId }: { clerkUserId: string }, data: Partial<typeof userTable.$inferInsert>) {
    const [updateUser] = await db.update(userTable).set(data).where(eq(userTable.clerkUserId, clerkUserId)).returning()

    if (updateUser == null) throw new Error("Failed to update user");
    revalidateUserCache(updateUser.id)

    return updateUser
}

export async function deleteUser({ clerkUserId }: { clerkUserId: string }) {
    const [deleteUser] = await db.update(userTable).set({
        deletedAt: new Date(),
        email: `user${Date.now()}@deleted.com`,
        name: 'Deleted user',
        clerkUserId: `${Date.now()}`,
        imageUrl: null
    }).where(eq(userTable.clerkUserId, clerkUserId)).returning()

    if (deleteUser == null) throw new Error("Failed to remove user");
    revalidateUserCache(deleteUser.id)

    return deleteUser
}