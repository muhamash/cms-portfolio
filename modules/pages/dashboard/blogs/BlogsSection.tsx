"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogCardProps } from "../../blogs/BlogCard";
import DOMPurify from 'dompurify';

interface BlogsDataProps {
  blogs: BlogCardProps[]
}

export default function BlogsSection ( { blogs }: BlogsDataProps )
{
    const router = useRouter();

  const handleEdit = (id: number) => {
    console.log("Edit blog with id:", id)
  }

  const handleDelete = (id: number) => {
    console.log("Delete blog with id:", id)
  }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map( ( blog ) => (
                <div
                    key={blog.id}
                    className="border rounded-lg shadow-sm hover:shadow-md transition flex flex-col overflow-hidden bg-sky-50"
                >
                    {/* Blog Image */}
                    <div className="relative w-full h-40 overflow-hidden group">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Link
                                href={`http://localhost:3001/blogs/${ blog.id }/${ blog.slug }`}
                                className="px-4 py-2 text-sm font-medium bg-white text-gray-900 rounded shadow hover:bg-gray-100"
                            >
                                View
                            </Link>
                        </div>
                    </div>


                    {/* Blog Content */}
                    <div className="flex flex-col justify-between p-4 gap-3">
                        <h3 className="text-md font-semibold line-clamp-1">
                            {blog.title}
                        </h3>
                        <div
                            className="text-muted-foreground mb-4 line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( blog.content ) }}
                        />

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 text-xs">
                            <div>
                                {blog.tags.map( ( tag, idx ) => (
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
                                    Created: {new Date( blog.createdAt ).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-gray-400 block">
                                    Updated: {new Date( blog.updatedAt ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-auto">
                            <button
                                onClick={() => handleEdit( blog.id )}
                                className="flex-1 px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete( blog.id )}
                                className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                </div>
            ) )}
        </div>
    );
}
