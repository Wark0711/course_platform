import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionsFormDialog } from "@/features/courseSections/components/SectionsFormDialog"
import { CourseForm } from "@/features/courses/components/CourseForm"
import { getCourse } from "@/features/courses/db/courses"
import { PlusIcon } from "lucide-react"
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
                        <Card>
                            <CardHeader className="flex items-center flex-row justify-between">
                                <CardTitle>Sections</CardTitle>
                                <SectionsFormDialog courseId={courseId}>
                                    <DialogTrigger asChild>
                                        <Button variant={'outline'}>
                                            <PlusIcon /> New Section
                                        </Button>
                                    </DialogTrigger>
                                </SectionsFormDialog>
                            </CardHeader>
                        </Card>
                    </TabsContent>
                    <TabsContent value="details">
                        <Card>
                            <CardHeader>
                                <CourseForm course={course} />
                            </CardHeader>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}