"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { HomePageTypes } from '@/lib/types/form.type';
import { Save } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

interface HomePageFormProps {
  defaultValues: {
    headerText: string;
    headerSubTitle: string;
    headerAboutText: string;
    headerAboutSubText: string;
    headerAboutAddress: string;
    headerAboutSubTitle: string;
  };
  onSubmit: (data: any) => Promise<void>;
}

export function HomePageForm({ defaultValues, onSubmit }: HomePageFormProps) {
  const form = useForm( { defaultValues } );
  const [ isPending, startTransition ] = useTransition();

  const handleSubmitForm = ( values: HomePageTypes ) =>
  {
    startTransition( async () =>
    {
      try
      {
        await onSubmit(values)
      } catch ( error: any )
      {
        throw error
      }
    } )
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        <Card>
          <CardHeader>
            <CardTitle>HomePage Information</CardTitle>
            <CardDescription>
              Update your homepage content and details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="headerText"
                rules={{ required: 'Header text is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Header Text</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Welcome to My Portfolio" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="headerSubTitle"
                rules={{ required: 'Header subtitle is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Header Subtitle</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full Stack Developer" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="headerAboutText"
                rules={{ required: 'About text is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Text</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="About Me" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="headerAboutSubTitle"
                rules={{ required: 'About subtitle is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Subtitle</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Building amazing web applications" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="headerAboutSubText"
              rules={{ required: 'About sub text is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Sub Text</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={3}
                      placeholder="Passionate developer with 5+ years of experience" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button disabled={isPending} type="submit">
                <Save className="w-4 h-4 mr-2" />
                {
                  isPending ? "Saving.." : "Save"
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}