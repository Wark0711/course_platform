'use client'

import { useForm } from "react-hook-form";
import { CourseSectionStatus, courseSectionStatuses } from "@/drizzle/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sectionSchema } from "../schema/sections";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RequiredLabelIcon } from "@/components/RequiredLabelIcon";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createSection, updateSection } from "../actions/sections";
import { actionToast } from "@/hooks/use-toast";

export function SectionForm({ courseId, section, onSuccess }: { courseId: string, onSuccess?: () => void, section?: { id: string, name: string, status: CourseSectionStatus } }) {

    const form = useForm<z.infer<typeof sectionSchema>>({
        resolver: zodResolver(sectionSchema),
        defaultValues: section ?? {
            name: '',
            status: 'public'
        }
    })

    async function onSubmit(values: z.infer<typeof sectionSchema>) {
        const action = section == null ? createSection.bind(null, courseId) : updateSection.bind(null, section.id)
        const data = await action(values)
        actionToast({ actionData: data })
        if (!data.error) onSuccess?.()
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-6 flex-col">
                    <div className="grid grid-cols-1 @lg:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Name <RequiredLabelIcon />
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="status" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Status
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            courseSectionStatuses.map(status => (
                                                <SelectItem key={status} value={status}>{status}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="self-end">
                        <Button disabled={form.formState.isSubmitting} type="submit">Save</Button>
                    </div>
                </form>
            </Form>
        </>
    )
}