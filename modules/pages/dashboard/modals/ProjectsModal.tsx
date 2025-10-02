"use client"

import { Button } from "@/components/ui/button"
import
    {
        Dialog, DialogContent, DialogDescription,
        DialogHeader, DialogTitle, DialogTrigger,
    } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createProject, updateProject } from "@/lib/utils/projects.utils"
import ImageUploader from "@/modules/layouts/ImageUploader"
import TextEditor from "@/modules/layouts/ReactQuillTextEditor"
import { Edit, Plus, Save, X } from "lucide-react"
import { useEffect, useState, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"


export default function ProjectsModal({ project }: any ) {
    const [ open, setOpen ] = useState(false)
    const [ isPending, startTransition ] = useTransition()

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            description: "",
            image: "",
            tags: "",
            githubLink: "",
            liveLink: ""
        },
    })

    // Prefill the form when editing
    useEffect(() => {
        if (project) {
            reset(project)  
        }
    }, [project, reset])

    const handleFormSubmit = async (values: any) => {
        const description = values.description || ""
        const textOnly = description.replace(/<[^>]*>/g, "").trim()

        if (!textOnly) {
            toast.error("Description should not be empty!!")
            return
        }

        startTransition(async () => {
            try {
                const result = project
                    ? await updateProject(project.id, values)
                    : await createProject(values)

                if (!result.success) {
                    toast.error(result?.message || "Failed to save project")
                    throw new Error("Failed to save project")
                }

                toast.success(project ? "Project updated successfully!" : "Project created successfully!")
                reset()
                setOpen(false)
            } catch (error: any) {
                console.error(error)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-green-800 text-white">
                    {project ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {project ? "Edit Project" : "Add Project"}
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{project ? "Edit Project" : "Add New  Project"}</DialogTitle>
                    <DialogDescription>
                        {project ? "Update the project details below" : "Fill in the details below to create a new project"}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input id="title" {...register("title", { required: "Title is required" })} placeholder="Enter project title" />
                        {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Image</Label>
                        <Controller
                            name="image"
                            control={control}
                            rules={{ required: "Image is required" }}
                            render={({ field }) => (
                                <ImageUploader onUpload={( file ) => field.onChange( file ? file as File : "" )} multiple={false} initialImage={ field.value } />
                            )}
                        />
                        {errors.image && <p className="text-destructive text-xs">{errors.image.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="githubLink">Github link *</Label>
                        <Input id="githubLink" {...register("githubLink", { required: "githubLink is required" })} placeholder="Enter project githubLink" />
                        {errors.githubLink && <p className="text-destructive text-xs">{errors.githubLink.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="liveLink">Live link *</Label>
                        <Input id="liveLink" {...register("liveLink", { required: "liveLink is required" })} placeholder="Enter project liveLink" />
                        {errors.liveLink && <p className="text-destructive text-xs">{errors.liveLink.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input id="tags" {...register("tags", { required: "Tags are required" })} placeholder="react, webdev, js" />
                        {errors.tags && <p className="text-destructive text-xs">{errors.tags.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Description *</Label>
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: "Description is required" }}
                            render={({ field }) => (
                                <TextEditor value={field.value} onChange={field.onChange} />
                            )}
                        />
                        {errors.description && <p className="text-destructive text-xs">{errors.description.message}</p>}
                    </div>

                    <div className="flex justify-end gap-2 pt-16">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </Button>
                        <Button disabled={isPending} type="submit">
                            <Save className="w-4 h-4 mr-2" />
                            {isPending ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
