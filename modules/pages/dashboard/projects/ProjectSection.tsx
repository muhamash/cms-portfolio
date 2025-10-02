"use client"

import { Button } from "@/components/ui/button";
import { deleteProject } from "@/lib/utils/projects.utils";
import DOMPurify from 'dompurify';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ProjectCardProps } from "../../projects/ProjectCard";
import ProjectsModal from "../modals/ProjectsModal";

interface ProjectsDataProps {
  projects: ProjectCardProps[]
}

export default function ProjectSection ( { projects }: ProjectsDataProps )
{
    const [deletingIds, setDeletingIds] = useState<number[]>([]);
    const router = useRouter();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map( ( project ) => (
                <div
                    key={project.id}
                    className="border rounded-lg shadow-sm hover:shadow-md transition flex flex-col overflow-hidden bg-sky-50"
                >
                    {/* project Image */}
                    <div className="relative w-full h-40 overflow-hidden group">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Link
                                href={`http://localhost:3001/projects/${ project.id }/${ project.slug }`}
                                className="px-4 py-2 text-sm font-medium bg-white text-gray-900 rounded shadow hover:bg-gray-100"
                            >
                                View
                            </Link>
                        </div>
                    </div>


                    {/* project description */}
                    <div className="flex flex-col justify-between p-4 gap-3 h-full">
                        <h3 className="text-md font-semibold line-clamp-1">
                            {project.title}
                        </h3>
                        <div
                            className="text-muted-foreground mb-4 line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( project.description ) }}
                        />

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 text-xs">
                            <div>
                                {project.tags.map( ( tag, idx ) => (
                                    <span
                                        key={idx}
                                        className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md"
                                    >
                                        #{tag}
                                    </span>
                                ) )}
                            </div>
                        
                            {/* Date */}
                            <div className="flex w-full justify-between items-center py-2">
                                <p className="text-xs text-gray-400 block">
                                    Created: {new Date( project.createdAt ).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-gray-400 block">
                                    Updated: {new Date( project.updatedAt ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-auto">
                            <ProjectsModal project={project}/>
                            <Button
                                onClick={async () =>
                                {
                                    setDeletingIds( prev => [ ...prev, project.id ] ); 
                                    const result = await deleteProject( project.id );

                                    if ( !result.success )
                                    {
                                        toast.error( result.message );
                                    } else
                                    {
                                        toast.success( result.message );
                                    }

                                    setDeletingIds( prev => prev.filter( id => id !== project.id ) ); 
                                }}
                                disabled={deletingIds.includes( project.id )}
                                className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                            >
                                {deletingIds.includes( project.id ) ? "Deleting..." : "Delete"}
                            </Button>
                        </div>
                    </div>
                </div>
            ) )}
        </div>
    );
}
