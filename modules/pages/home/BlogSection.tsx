"use client"

import { motion, useInView } from 'framer-motion';
import Link from "next/link";
import { useRef } from "react";
import BlogCard from "../blogs/BlogCard";

export default function BlogSection ({blogs}:any)
{
    const ref = useRef(null);
    const isInView = useInView( ref, { once: true, margin: "-100px" } );

    // const resolvedBlog = use( blogs )
    // console.log(resolvedBlog)

    return (
        <div ref={ref} className='py-20'>

            <motion.div initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="mb-16 flex flex-col items-center justify-center">

                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-violet-800 font-mono text-center">Featured Projects</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-center">
                    A collection of projects that showcase my skills and passion for development
                </p>

                <div className='grid md:grid-cols-3 grid-cols-1 gap-4 py-10 align-items-center w-full'>
                    {
                        blogs?.length > 0 ? (
                            blogs?.slice(0,3).map( ( blog, index ) => (
                                <BlogCard key={blog.id} index={index} title={blog.title} content={blog.content} id={blog.id} slug={blog.slug} createdAt={blog.createdAt} updatedAt={blog.updatedAt} tags={blog.tags} image={blog.image} />
                            ) )
                        ) : (
                            <p>No data left</p>
                        )
                    }
                </div>
                
                <Link className='bg-gradient-to-r from-orange-600 to-pink-600 hover:from-amber-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg font-mono rounded-lg' href={"/blogs"}>
                    Explore more
                </Link>
            </motion.div>
        </div>
    );
}
