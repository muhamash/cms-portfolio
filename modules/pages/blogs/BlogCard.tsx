"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import DOMPurify from "dompurify";
import { motion } from 'framer-motion';
import { ArrowRight, Calendar1Icon, Tag } from 'lucide-react';
import Link from 'next/link';

export interface BlogCardProps
{
    id: number;
    index: number;
    title: string;
    content: string;
    slug: string;
    image: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export default function BlogCard ( { id, slug, title, content, image, tags, createdAt, updatedAt, index }: BlogCardProps )
{
    const formatDate = ( dateString: string ) =>
    {
        return new Date( dateString ).toLocaleDateString( 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        } );
    };
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
        >
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col bg-slate-100">
                <div className="relative overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                
                <CardContent className="p-6 flex-1">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                            <Calendar1Icon size={14} />
                            {formatDate( createdAt )}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                  
                    <div
                        className="text-muted-foreground mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( content ) }}
                    />

                    <div className="flex flex-wrap gap-1 mb-4">
                        {tags?.map( ( tag ) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                                <Tag size={10} className="mr-1" />
                                {tag}
                            </Badge>
                        ) )}
                        {tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                                +{tags.length - 2}
                            </Badge>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                    <Link href={`/blogs/${ id }/${ slug }`} className="w-full">
                        <Button className="w-full group bg-cyan-900 text-white">
                            Read More
                            <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
