'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useInView } from 'framer-motion';
import { CircleCheck as CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const ContactPageSection = ({data}: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(5),
    message: z.string().min(10),
  });

  type FormData = z.infer<typeof formSchema>;
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Contact form data:', data);
      setIsSubmitted(true);
      toast.success('Message sent successfully!');
      reset();
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(data)

  const contactInfo = [
    {
      icon: Mail, label: 'Email', value: data?.email,
      href: `mailto:${ data?.email }`
    },
    {
      icon: Phone, label: 'Phone', value: data?.phone,
      href: `tel:${ data?.phone }`
    },
    {
      icon: MapPin, label: 'Location', value: data?.address,
      href: `https://www.google.com/maps/search/${ data?.address }`
    }
  ];

  return (
    <section id="contact" ref={ref} className="py-24 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-700 font-mono">Let's Collaborate</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a project or idea in mind? Drop me a message, and let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 ">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <info.icon size={24} />
                  </div>
                  <div>
                    <p className="font-medium">{info.label}</p>
                    <p className="text-gray-500">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="rounded-2xl bg-white/80 backdrop-blur-lg shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Send Me a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-gray-500">Thank you! I’ll respond within 24 hours.</p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mt-4">
                      Send Another
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input placeholder="Name" {...register('name')} className={errors.name ? 'border-red-500' : ''} />
                      <Input placeholder="Email" {...register('email')} className={errors.email ? 'border-red-500' : ''} />
                    </div>
                    <Input placeholder="Subject" {...register('subject')} className={errors.subject ? 'border-red-500' : ''} />
                    <Textarea placeholder="Message" rows={6} {...register('message')} className={errors.message ? 'border-red-500' : ''} />
                    <Button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg">
                      {isSubmitting ? 'Sending...' : <><Send size={16} className="mr-2" /> Send Message</>}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPageSection;
