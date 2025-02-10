import { getIdTag } from "@/lib/dataCache"
import { revalidateTag } from "next/cache"

export function getUserGlobalTag() {
    return 'users'
}

export function getUserIdTag(id: string) {
    return getIdTag('users', id)
}

export function revalidateUserCache(id: string) {
    revalidateTag(getUserGlobalTag())
    revalidateTag(getUserIdTag(id))
}