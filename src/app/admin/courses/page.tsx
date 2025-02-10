import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CoursePage() {
    return (
        <div className="my-6 px-3">
            <PageHeader title="Courses">
                <Button asChild>
                    <Link href={'/admin/courses/new'}>New Course</Link>
                </Button>
            </PageHeader>
        </div>
    )
}