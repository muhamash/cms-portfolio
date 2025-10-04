"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Edit, Plus, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

interface SocialLinksManagerProps {
  initialLinks: SocialLink[];
  onCreate: (data: Omit<SocialLink, 'id'>) => Promise<void>;
  onUpdate: (id: number, data: Omit<SocialLink, 'id'>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function SocialLinksManager({ 
  initialLinks, 
  onCreate, 
  onUpdate, 
  onDelete 
}: SocialLinksManagerProps) {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialLinks);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const newForm = useForm({ defaultValues: { platform: '', url: '' } });
  const editForm = useForm({ defaultValues: { platform: '', url: '' } });

  const handleCreate = async (data: any) => {
    await onCreate(data);
    const newLink = { id: Date.now(), ...data };
    setSocialLinks([...socialLinks, newLink]);
    newForm.reset();
    setIsAdding(false);
  };

  const handleUpdate = async (data: any) => {
    if (editingId) {
      await onUpdate(editingId, data);
      setSocialLinks(socialLinks.map(link => 
        link.id === editingId ? { ...link, ...data } : link
      ));
      setEditingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    await onDelete(id);
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const startEditing = (link: SocialLink) => {
    setEditingId(link.id);
    editForm.reset({ platform: link.platform, url: link.url });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>Manage your social media profiles</CardDescription>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Link
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAdding && (
          <Card className="border-2 border-dashed">
            <CardContent className="pt-6">
              <Form {...newForm}>
                <form onSubmit={newForm.handleSubmit(handleCreate)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={newForm.control}
                      name="platform"
                      rules={{ required: 'Platform is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Platform</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., LinkedIn, GitHub" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={newForm.control}
                      name="url"
                      rules={{ 
                        required: 'URL is required',
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: 'Please enter a valid URL'
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input {...field} type="url" placeholder="https://..." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => {
                      setIsAdding(false);
                      newForm.reset();
                    }}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="w-4 h-4 mr-2" />
                      Save Link
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {socialLinks.map((link) => (
          <Card key={link.id}>
            <CardContent className="pt-6">
              {editingId === link.id ? (
                <Form {...editForm}>
                  <form onSubmit={editForm.handleSubmit(handleUpdate)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={editForm.control}
                        name="platform"
                        rules={{ required: 'Platform is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Platform</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., LinkedIn, GitHub" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={editForm.control}
                        name="url"
                        rules={{ 
                          required: 'URL is required',
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: 'Please enter a valid URL'
                          }
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                              <Input {...field} type="url" placeholder="https://..." />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        Update Link
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{link.platform}</p>
                    <p className="text-sm text-muted-foreground break-all">{link.url}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditing(link)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(link.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
