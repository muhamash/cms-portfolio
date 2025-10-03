'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowDown, Code2Icon, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export function HeroSection ()
{
    const scrollToProjects = () =>
    {
        const projectsSection = document.getElementById( 'projects' );
        projectsSection?.scrollIntoView( { behavior: 'smooth' } );
    };

    return (
        <section className="min-h-screen flex items-center justify-center relative">
          
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen ">
                <motion.div
                    className="text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Profile Image */}
                    <motion.div
                        className="mb-8"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1 shadow-2xl">
                            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                                <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    MD
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                        variants={itemVariants}
                    >
                        <span className="block text-gray-900 dark:text-white">Hi, I'm</span>
                        <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Md Ashraful Alam
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        Full Stack Developer & UI/UX Designer crafting beautiful, functional web experiences
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
                        variants={itemVariants}
                    >
                        <Link href="/projects">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-teal-600 to-sky-600 hover:from-amber-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg font-mono"
                            >
                                View My Work
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-purple-300 hover:border-rose-600 px-8 py-3 text-lg font-mono"
                            >
                                About me
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        className="flex justify-center space-x-6 mb-12"
                        variants={itemVariants}
                    >
                        {[
                            { href: 'https://github.com/johndoe', icon: Github, label: 'GitHub' },
                            { href: 'https://linkedin.com/in/johndoe', icon: Linkedin, label: 'LinkedIn' },
                            { href: 'mailto:john.doe@example.com', icon: Mail, label: 'Email' },
                        ].map( ( social ) =>
                        {
                            const Icon = social.icon;
                            return (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={social.label}
                                >
                                    <Icon className="w-6 h-6" />
                                </motion.a>
                            );
                        } )}
                    </motion.div>
                  
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-4 max-w-7xl mx-auto pb-10"
                    >
                        {[ 'React', 'Next.js', 'Node.js',"JavaScript",'TypeScript', "Express.js", "TailwindCss" ].map( ( skill, index ) => (
                            <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                                className="flex items-center justify-center gap-2 p-4 rounded-lg bg-violet-100 border border-border/50 hover:bg-card transition-colors"
                            >
                                <Code2Icon size={16} className="text-primary" />
                                <span className="font-medium">{skill}</span>
                            </motion.div>
                        ) )}
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
                        variants={itemVariants}
                    >
                        {[
                            { label: 'Years Experience', value: '5+' },
                            { label: 'Projects Completed', value: '50+' },
                            { label: 'Happy Clients', value: '30+' },
                        ].map( ( stat, index ) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                            </motion.div>
                        ) )}
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.button
                        className="mx-auto flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 hover:border-blue-600 transition-colors duration-300 mb-20"
                        onClick={scrollToProjects}
                        variants={itemVariants}
                        animate={{
                            y: [ 0, 10, 0 ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        aria-label="Scroll to projects"
                    >
                        <ArrowDown className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}