"use client"

import { motion, useInView } from 'framer-motion';
import { MailIcon, MapPinCheck, PhoneCallIcon } from 'lucide-react';
import { useRef } from "react";

export default function ContactSection ({data}:any)
{
    const ref = useRef(null);
    const isInView = useInView( ref, { once: true, margin: "-100px" } );

    const contactInfo = [
        {
            icon: MailIcon,
            label: 'Email',
            value: data?.email,
            href: `mailto:${data?.email}`
        },
        {
            icon: PhoneCallIcon,
            label: 'Phone',
            value: data?.phone,
            href: `tel:${data?.phone}`
        },
        {
            icon: MapPinCheck,
            label: 'Location',
            value: data?.address,
            href: `https://www.google.com/maps/search/${data?.address}`
        }
    ];
    
    return (
        <div ref={ref} className='py-10'>
            <motion.div initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="mb-16 flex flex-col items-center justify-center">
              
                <div className='flex flex-col gap-3 items-center justify-center text-center mb-10'>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rose-700 font-serif">Let's Work Together</h2>
                <p className="text-teal-800 max-w-2xl mx-auto">
                    Have a project in mind? I'd love to hear about it. Let's create something amazing together.
                </p>
                </div>
                
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-8"
                >
                    <div className='flex flex-col gap-1 items-center justify-center text-center'>
                        <h3 className="text-2xl font-mono text-violet-800 mb-6">Get In Touch</h3>
                        <p className="text-slate-800 mb-8">
                            I'm always open to discussing new opportunities, creative projects,
                            or potential collaborations. Feel free to reach out!
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-between items-center gap-4">
                        {contactInfo.map( ( info, index ) => (
                            <motion.a
                                key={info.label}
                                href={info.href}
                                target={info.href.startsWith( 'http' ) ? '_blank' : undefined}
                                rel={info.href.startsWith( 'http' ) ? 'noopener noreferrer' : undefined}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                className="flex items-center gap-4 p-4 rounded-lg hover:bg-card transition-colors group"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <info.icon className="text-violet-800" size={20} />
                                </div>
                                <div>
                                    <p className="font-medium">{info.label}</p>
                                    <p className="text-muted-foreground">{info.value}</p>
                                </div>
                            </motion.a>
                        ) )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
