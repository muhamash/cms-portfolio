"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { personalInfoSchema } from '@/lib/validations/form.validation';
import ImageUploader from '@/modules/layouts/ImageUploader';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useTransition } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

interface PersonalInfoFormProps {
  defaultValues: any;
  onSubmit: (data: FieldValues) => Promise<void>;
}

export function PersonalInfoForm({ defaultValues, onSubmit }: PersonalInfoFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<{ name: string; phone: string; email: string; address?: string; title?: string; image?: string | File; }>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
  });

  const handleSubmitForm = ( values: { name: string; phone: string; email: string; address?: string; title?: string; image?: string | File; } ) =>
  {
    startTransition( async () =>
    {
      try
      {
        // console.log( "Form values:", values );

        await onSubmit( values );
      }
      catch ( error: any )
      {
        throw error;
      }
    } );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit( handleSubmitForm )}>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your basic information and contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Image Upload Field */}
            <FormField
              control={form.control}
              name="image"
              render={( { field } ) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <ImageUploader
                      multiple={false}
                      initialImage={field.value}
                      onUpload={( file ) =>
                      {
                        if ( file )
                        {
                          field.onChange( file as File );
                        } else
                        {
                          field.onChange( "" );
                        }
                      }}
                    />

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Full Name */}
            <FormField
              control={form.control}
              name="name"
              render={( { field } ) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Professional Title */}
            <FormField
              control={form.control}
              name="title"
              render={( { field } ) => (
                <FormItem>
                  <FormLabel>Professional Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={( { field } ) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={( { field } ) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={( { field } ) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Save Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                <Save className="w-4 h-4 mr-2" />
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}