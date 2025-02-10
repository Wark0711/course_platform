import { Badge } from "@/components/ui/badge";
import { adminNavigationLinks } from "@/constants";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />

            {children}
        </>
    )
}

function Navbar() {
    return (
        <header className="flex h-12 shadow bg-background z-10">
            <nav className="flex gap-4 w-full px-3">
                <div className="mr-auto flex items-center gap-2">
                    <Link className="text-lg hover:underline" href="/admin">
                        Web Dev Simplified
                    </Link>
                    <Badge>Admin</Badge>
                </div>
                {
                    adminNavigationLinks?.map(i => (
                        <Link href={i.href} key={i.label} className="hover:bg-accent/10 flex items-center px-2">{i.label}</Link>
                    ))
                }
                <div className="size-7 self-center">
                    <UserButton appearance={{ elements: { userButtonAvatarBox: { width: '100%', height: '100%' } } }} />
                </div>
            </nav>
        </header>
    )
}