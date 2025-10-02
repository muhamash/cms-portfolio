"use client"

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from "react";
import ProjectCard from '../projects/ProjectCard';

export default function ProjectSection ({projects}:any)
{
    const ref = useRef(null);
    const isInView = useInView( ref, { once: true, margin: "-100px" } );

    // const resolvedProjects = use( projects );
    // console.log(resolvedProjects)
    
    return (
        <div ref={ref} className='pt-30' id='projects'>
            <motion.div initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="mb-16 flex flex-col items-center justify-center">
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-violet-800 font-mono text-center">Featured Projects</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-center">
                    A collection of projects that showcase my skills and passion for development
                </p>

                <div className='grid md:grid-cols-3 grid-cols-1 gap-4 py-10 align-items-center'>
                    {
                        projects?.length > 0 ? (
                            projects.slice( 0, 3 ).map( ( project, index ) => (
                                <ProjectCard
                                    key={project.id}
                                    id={project.id}
                                    title={project.title}
                                    description={project.description}
                                    slug={project.slug}
                                    tags={project.tags}
                                    image={project.image}
                                    createdAt={project.createdAt}
                                    githubLink={project.githubLink}
                                    liveLink={project.liveLink}
                                    updatedAt={project.updatedAt}
                                />
                            ) )
                        ) : (
                            <p>No Data left!!</p>
                        )
                    }

                </div>

                <Link className='bg-gradient-to-r from-orange-600 to-pink-600 hover:from-amber-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg font-mono rounded-lg' href={"/projects"}>
                    View more
                </Link>
            </motion.div>
        </div>
    );
}
