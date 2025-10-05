'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { useRef } from 'react';

const AboutSection = ({data, stats}:any) => {
  const ref = useRef(null);
    const isInView = useInView( ref, { once: true, margin: "-100px" } );
    
    console.log(data)

    return (
        <section ref={ref} className="py-20 px-6 md:px-12 container mx-auto">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-800 font-mono">About Me</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Passionate about creating innovative solutions and bringing ideas to life through hard working!!
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Personal Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className="mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <motion.div
                                    className="mb-8"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-[3px] shadow-2xl">
                                        <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 overflow-hidden">
                                            <img
                                                src={data?.image}
                                                alt="headerImage"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                                <div>
                                    <h3 className="text-2xl font-bold">{data?.name}</h3>
                                    <p className="text-muted-foreground">{data?.title}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin size={16} className="text-primary" />
                                    <span>{data?.address}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar size={16} className="text-primary" />
                                    <span>Available for freelance</span>
                                </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                                {data?.HomePage?.headerAboutSubText}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        {stats?.map( ( stat, index ) => (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                            >
                                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                                    <div className="text-2xl font-bold">{stat.value}+</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </Card>
                            </motion.div>
                        ) )}
                    </div>
                </motion.div>

                {/* Skills & Experience */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-8"
                >
                    {/* Skills */}
                    <Card>
                        <CardContent className="p-8">
                            <h3 className="text-xl font-bold mb-6">Technical Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {data?.skills?.map( ( skill, index ) => (
                                    <motion.div
                                        key={skill?.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                                    >
                                        <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                                            {skill?.name}
                                        </Badge>
                                    </motion.div>
                                ) )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Experience Timeline */}
                    <Card>
                        <CardContent className="p-8">
                            <h3 className="text-xl font-bold mb-6">Work Experience</h3>
                            <div className="space-y-6">
                                {data?.experiences?.map( ( exp, index ) => (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                        className="relative pl-6 border-l-2 border-primary/20"
                                    >
                                        <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                                        <div className="mb-2">
                                            <h4 className="font-semibold">{exp.position}</h4>
                                            <p className="text-primary font-medium">{exp.company}</p>
                                            <p className="text-sm text-muted-foreground">{exp.timeLine}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                                    </motion.div>
                                ) )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
            {/* Education */}
            <div className='mt-20 flex flex-col items-center justify-center '>
                <h3 className="text-xl text-center font-bold mb-6">Education</h3>
                <div className="space-y-6">
                    {data?.education?.map( ( edu, index ) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                            className="relative pl-6 border-l-2 border-primary/20"
                        >
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                            <div className="mb-2">
                                <h4 className="font-semibold">{edu.degree}</h4>
                                <p className="text-primary font-medium">{edu.institute}</p>
                                <p className="text-sm text-muted-foreground">{edu.timeLine}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{edu.description}</p>
                        </motion.div>
                    ) )}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;