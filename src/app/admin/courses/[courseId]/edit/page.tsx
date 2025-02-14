import { PageHeader } from "@/components/PageHeader"
import { Card, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseForm } from "@/features/courses/components/CourseForm"
import { getCourse } from "@/features/courses/db/courses"
import { notFound } from "next/navigation"

export default async function EditCourse({ params }: { params: Promise<{ courseId: string }> }) {

    const { courseId } = await params
    const course = await getCourse(courseId)
    if (course == null) return notFound()

    return (
        <>
            <div className="my-6 px-3">
                <PageHeader title={course.name} />

                <Tabs defaultValue="lessons">
                    <TabsList>
                        <TabsTrigger value="lessons">Lessons</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>

                    <TabsContent value="lessons">
                        Lessons
                    </TabsContent>
                    <TabsContent value="details">
                        <Card>
                            <CardHeader>
                                {/* <CourseForm course={course} /> */}
                            </CardHeader>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}