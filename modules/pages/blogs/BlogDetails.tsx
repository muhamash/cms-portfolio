"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, CheckCheckIcon, Share2Icon, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BlogCardProps } from "./BlogCard";

export default function BlogDetails({ blog }: { blog: BlogCardProps }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      setTimeout(() => setCopied(false), 5000); 
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const created = blog.createdAt ? new Date(blog.createdAt) : null;
  const dateLabel = created
    ? created.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Hero Section */}
      <div className="relative h-80 w-full bg-gradient-to-b from-slate-900/70 to-slate-900/40">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 h-full flex flex-col justify-end">

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="md:text-4xl text-xl font-extrabold tracking-tight text-white drop-shadow-md"
          >
            {blog.title}
          </motion.h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 opacity-80" />
              <span>{dateLabel}</span>
            </div>

            <div className="h-4 w-px bg-slate-300/40" />

            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 opacity-80" />
              <span>{blog.tags?.length ?? 0} tags</span>
            </div>
          </div>
        </div>
      </div>

      
      {/* Content Section */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-slate-900 bg-pink-200 hover:text-white hover:bg-red-800"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="prose prose-slate  prose-img:rounded-xl prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose prose-slate w-full max-w-3xl break-words"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( blog.content ) }}
        />

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-3">
            {blog.tags.map( ( t ) => (
              <Badge
                key={t}
                className="capitalize bg-slate-100 text-slate-700 px-3 py-1"
              >
                #{t}
              </Badge>
            ) )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-10 flex items-center justify-between border-t pt-6">
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex items-center gap-2 bg-sky-200"
          >
            {copied ? <CheckCheckIcon className="h-4 w-4 text-green-500" /> : <Share2Icon className="h-4 w-4" />}
            {copied ? "Copied!" : "Share link"}
          </Button>

          <Button
            onClick={() => window.scrollTo( { top: 0, behavior: "smooth" } )}
            variant="secondary"
          >
            Back to top
          </Button>
        </div>
      </main>
    </div>
  );
}