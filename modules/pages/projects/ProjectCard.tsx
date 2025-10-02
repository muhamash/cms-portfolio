"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import { DockIcon, ExternalLinkIcon, GithubIcon } from 'lucide-react';
import Link from 'next/link';

export interface ProjectCardProps
{
    id: number;
    title: string;
    description: string;
    slug: string;
    tags: string[];
    image: string;
    createdAt: string;
    githubLink: string;
    liveLink: string;
    updatedAt: string;
}


export default function ProjectCard ( { id, title, description, slug, tags, image, createdAt, githubLink, liveLink, updatedAt }: ProjectCardProps )
{
    return (
        <motion.div
            className='cursor-pointer'
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: id * 0.1 }}
        >
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <div className="relative overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                            size="sm"
                            
                            className="mr-2 cursor-pointer"
                        >
                            <Link className='flex items-center justify-center' href={`/projects/${id}/${slug}`}>
                                <DockIcon size={14} className="mr-1" />
                                <p>View Details</p>
                            </Link>
                        </Button>
                    </div>
                </div>
                <CardContent className="p-6 flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold">{title}</h3>
                    </div>
                    
                    <div
                        className="text-muted-foreground mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( description ) }}
                    />
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                        {tags.slice( 0, 3 ).map( ( tech ) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                            </Badge>
                        ) )}
                        {tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                                +{tags.length - 3}
                            </Badge>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <div className="flex gap-2 w-full">
                        <Button size="sm" className="flex-1" asChild>
                            <a href={liveLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLinkIcon size={14} className="mr-1" />
                                Live
                            </a>
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1" asChild>
                            <a href={githubLink} target="_blank" rel="noopener noreferrer">
                                <GithubIcon size={14} className="mr-1" />
                                Code
                            </a>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
