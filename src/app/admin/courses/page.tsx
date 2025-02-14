import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { CourseTable } from "@/features/courses/components/CourseTable";
import { getCourses } from "@/features/courses/db/courses";
import Link from "next/link";

export default async function CoursePage() {

    const courses = await getCourses()

    return (
        <div className="my-6 px-3">
            <PageHeader title="Courses">
                <Button asChild>
                    <Link href={'/admin/courses/new'}>New Course</Link>
                </Button>
            </PageHeader>

            <CourseTable courses={courses} />
        </div>
    )
}