"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink, GithubIcon } from 'lucide-react';
import { ProjectCardProps } from "./ProjectCard";


export default function ProjectDetails({ project }: { project: ProjectCardProps }) {
  const dateLabel = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen flex items-start justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-64 md:h-auto md:min-h-[420px] w-full bg-slate-100">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                //   fill
                //   sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-400">
                  <svg className="w-20 h-20 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 7v10a2 2 0 0 0 2 2h14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>

            <CardContent className="p-8 flex flex-col justify-between">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 }}
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900"
                >
                  {project.title}
                </motion.h2>

                <div className="mt-3 text-sm text-slate-500 flex items-center gap-3">
                  <span>{dateLabel}</span>
                  <span className="h-4 w-px bg-slate-200" />
                  <span>{project.tags?.length ?? 0} tags</span>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12 }}
                  className="mt-6 text-slate-700 leading-relaxed max-w-none"
                >
                  {project.description}
                </motion.p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags?.map((t) => (
                    <Badge key={t} className="capitalize bg-white/90 text-slate-800 px-3 py-1 shadow-sm">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer">
                      <Button variant="outline" className="flex items-center gap-2">
                        <GithubIcon className="w-4 h-4" />
                        Repo
                      </Button>
                    </a>
                  )}

                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer">
                      <Button className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </Button>
                    </a>
                  )}
                </div>

                <div className="text-xs text-slate-400">
                  <div>Updated: {project.updatedAt ? new Date(project.updatedAt).toLocaleString() : "-"}</div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
