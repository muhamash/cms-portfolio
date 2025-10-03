'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useInView } from 'framer-motion';
import { Award, Calendar, Code as Code2, Coffee, MapPin, User } from 'lucide-react';
import { useRef } from 'react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
    'PostgreSQL', 'MongoDB', 'Prisma', 'Tailwind CSS', 'AWS', 'Docker'
  ];

  const experiences = [
    {
      role: 'Senior Full Stack Developer',
      company: 'Tech Innovators Inc.',
      period: '2023 - Present',
      description: 'Leading development of scalable web applications using React, Next.js, and Node.js.'
    },
    {
      role: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      period: '2021 - 2023',
      description: 'Developed and maintained multiple client projects with modern JavaScript frameworks.'
    },
    {
      role: 'Frontend Developer',
      company: 'StartUp Hub',
      period: '2020 - 2021',
      description: 'Built responsive user interfaces and collaborated with design teams.'
    }
  ];

  const stats = [
    { icon: Code2, label: 'Projects Completed', value: '50+' },
    { icon: Coffee, label: 'Coffee Consumed', value: '1000+' },
    { icon: Award, label: 'Awards Won', value: '5' },
    { icon: User, label: 'Happy Clients', value: '25+' }
  ];

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
                    Passionate about creating innovative solutions and bringing ideas to life through code
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
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                                    <User className="text-primary-foreground" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Md Ashraful Alam</h3>
                                    <p className="text-muted-foreground">Full Stack Developer</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin size={16} className="text-primary" />
                                    <span>San Francisco, CA</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar size={16} className="text-primary" />
                                    <span>Available for freelance</span>
                                </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                                I'm a passionate full-stack developer with 4+ years of experience building
                                modern web applications. I love creating efficient, scalable solutions and
                                staying up-to-date with the latest technologies. When I'm not coding, you
                                can find me exploring new frameworks or contributing to open-source projects.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map( ( stat, index ) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                            >
                                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                                    <stat.icon className="mx-auto text-primary mb-2" size={24} />
                                    <div className="text-2xl font-bold">{stat.value}</div>
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
                                {skills.map( ( skill, index ) => (
                                    <motion.div
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                                    >
                                        <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                                            {skill}
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
                                {experiences.map( ( exp, index ) => (
                                    <motion.div
                                        key={exp.role}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                        className="relative pl-6 border-l-2 border-primary/20"
                                    >
                                        <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                                        <div className="mb-2">
                                            <h4 className="font-semibold">{exp.role}</h4>
                                            <p className="text-primary font-medium">{exp.company}</p>
                                            <p className="text-sm text-muted-foreground">{exp.period}</p>
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
                        {[
                            {
                                degree: "B.Sc. in Computer Science",
                                institution: "National University",
                                period: "2016 - 2020",
                                description: "Focused on software development, data structures, and web technologies."
                            },
                            {
                                degree: "H.S.C. in Science",
                                institution: "Dhaka College",
                                period: "2014 - 2016",
                                description: "Major in Science, strong foundation in mathematics and programming."
                            }
                        ].map( ( edu, index ) => (
                            <motion.div
                                key={edu.degree}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                                className="relative pl-6 border-l-2 border-primary/20"
                            >
                                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                                <div className="mb-2">
                                    <h4 className="font-semibold">{edu.degree}</h4>
                                    <p className="text-primary font-medium">{edu.institution}</p>
                                    <p className="text-sm text-muted-foreground">{edu.period}</p>
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