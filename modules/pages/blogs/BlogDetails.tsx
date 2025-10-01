"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { BlogCardProps } from "./BlogCard";


export default function BlogDetails({ blog }: { blog: BlogCardProps }) {
  const router = useRouter();

  const created = blog.createdAt ? new Date(blog.createdAt) : null;
  const dateLabel = created
    ? created.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : "";

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <Card className="overflow-hidden rounded-2xl">
          <div className="relative h-64 sm:h-72 md:h-80 w-full bg-gradient-to-br from-slate-900/5 to-white">
            {blog.image ? (
              <img
                src={blog.image}
                alt={blog.title}
                // sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                <svg className="w-20 h-20 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 7v10a2 2 0 0 0 2 2h14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}

            <div className="absolute left-4 bottom-4 flex flex-wrap items-center gap-2">
              {blog.tags?.slice(0, 4).map((t) => (
                <Badge key={t} className="capitalize bg-white/90 text-slate-800 px-3 py-1 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3 h-3 opacity-80" />
                    <span className="text-xs font-medium">{t}</span>
                  </div>
                </Badge>
              ))}
            </div>
          </div>

          <CardContent className="p-8 md:p-10">
            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-slate-900"
            >
              {blog.title}
            </motion.h1>

            <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{dateLabel}</span>
              </div>

              <div className="h-4 w-px bg-slate-200" />

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 20v-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{blog.tags?.length ?? 0} tags</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="mt-6 prose prose-slate max-w-none prose-a:underline prose-a:decoration-slate-400"
            >
              {/* render content as paragraphs */}
              {blog.content.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {blog.tags?.map((t) => (
                  <Button key={t} variant="outline" size="sm" className="capitalize">
                    #{t}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => navigator.clipboard.writeText(window.location.href)} variant="ghost">
                  Share
                </Button>

                <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  Back to top
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
