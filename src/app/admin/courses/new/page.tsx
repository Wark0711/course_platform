import { PageHeader } from "@/components/PageHeader";
import { CourseForm } from "@/features/courses/components/CourseForm";

export default function NewCoursePage() {
    return (
        <div className="my-6 px-3">
            <PageHeader title="New Course" />
            <CourseForm />
        </div>
    )
}