'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LessonStatus } from "@/drizzle/schema";
import { ReactNode, useState } from "react";
import { LessonForm } from "./LessonForm";

export function LessonsFormDialog({ defaultSectionId, sections, children, lesson }:
    {
        defaultSectionId?: string,
        children: ReactNode,
        sections: { id: string, name: string }[],
        lesson?: {id: string, name: string, status: LessonStatus, youtubeVideoId: string, description: string | null, sectionId: string}
    }) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {children}

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{lesson == null ? 'New Lesson' : `Edit ${lesson.name}`}</DialogTitle>
                    </DialogHeader>

                    <div className="mt-4">
                        <LessonForm sections={sections} lesson={lesson} onSuccess={() => setIsOpen(false)} defaultSectionId={defaultSectionId} />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}