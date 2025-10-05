"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DOMPurify from 'dompurify';
import { motion } from "framer-motion";
import { ArrowLeftCircleIcon, CheckCheckIcon, ExternalLink, GithubIcon, Share2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProjectCardProps } from "./ProjectCard";

export default function ProjectDetails({ project }: { project: ProjectCardProps }) {
  const [ copied, setCopied ] = useState( false );
  const router = useRouter();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      setTimeout(() => setCopied(false), 5000); 
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const dateLabel = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
  

  return (
    <div className="min-h-screen w-full max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {project.title}
        </h1>


        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mt-3">
          {dateLabel && <span>Published: {dateLabel}</span>}
          {project.updatedAt && (
            <>
              <span className="h-4 w-px bg-slate-300" />
              <span>
                Updated: {new Date(project.updatedAt).toLocaleDateString()}
              </span>
            </>
          )}
          {project.tags?.map((t) => (
            <Badge
              key={t}
              className="bg-slate-100 text-slate-800 capitalize rounded-md"
            >
              {t}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 mt-4">
          <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-900 bg-pink-200 hover:text-white hover:bg-red-800 rounded-full"
        >
          <ArrowLeftCircleIcon className="h-4 w-4" /> Back
        </Button>
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer">
              <Button variant="outline" className="flex items-center gap-2 rounded-full">
                <GithubIcon className="w-4 h-4" />
                Repository
              </Button>
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer">
              <Button className="flex items-center gap-2 rounded-full">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Button>
            </a>
          )}
        </div>
      </motion.div>

      {/* Preview Image */}
      {project.image && (
        <div className="mb-10">
          <img
            src={project.image}
            alt={project.title}
            className="rounded-xl border border-slate-200 shadow-md max-h-80 w-full object-cover"
          />
        </div>
      )}

      {/* Rich Text Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="prose prose-slate w-full max-w-3xl break-words"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }}
      />

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
    </div>
  );
}
