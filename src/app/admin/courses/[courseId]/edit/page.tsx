import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionsFormDialog } from "@/features/courseSections/components/SectionsFormDialog"
import { SortableSectionList } from "@/features/courseSections/components/SortableSectionList"
import { CourseForm } from "@/features/courses/components/CourseForm"
import { getCourse } from "@/features/courses/db/courses"
import { LessonsFormDialog } from "@/features/lessons/components/LessonsFormDialog"
import { SortableLessonList } from "@/features/lessons/components/SortableLessonList"
import { cn } from "@/lib/utils"
import { EyeClosedIcon, PlusIcon } from "lucide-react"
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

                    <TabsContent value="lessons" className="flex flex-col gap-3">
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
                            <CardContent>
                                <SortableSectionList courseId={course.id} sections={course.courseSections} />
                            </CardContent>
                        </Card>
                        <hr className="my-2" />
                        {
                            course.courseSections.map(section => (
                                <Card key={section.id}>
                                    <CardHeader className="flex items-center flex-row justify-between gap-4">
                                        <CardTitle className={cn('flex items-center gap-2', section.status == 'private' && 'text-muted-foreground')}>{section.status === 'private' && <EyeClosedIcon />} {section.name}</CardTitle>
                                        <LessonsFormDialog defaultSectionId={section.id} sections={course.courseSections}>
                                            <DialogTrigger asChild>
                                                <Button variant={'outline'}>
                                                    <PlusIcon /> New Lesson
                                                </Button>
                                            </DialogTrigger>
                                        </LessonsFormDialog>
                                    </CardHeader>
                                    <CardContent>
                                        <SortableLessonList lessons={section.lessons} sections={course.courseSections} />
                                    </CardContent>
                                </Card>
                            ))
                        }
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