"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { socialLinkSchema, updateSocialSchema } from '@/lib/validations/form.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, LucideClockFading, Plus, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface SocialLink {
  id?: number;
  platform?: string;
  url?: string;
}

interface SocialLinksManagerProps {
  initialLinks: SocialLink[];
  onCreate: (data: Omit<SocialLink, 'id'>) => Promise<void>;
  onUpdate: (id: number, data: Omit<SocialLink, 'id'>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function SocialLinksManager({ initialLinks, onCreate, onUpdate, onDelete }: SocialLinksManagerProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [pendingMap, setPendingMap] = useState<{ [key: string]: boolean }>({});

  const newForm = useForm({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: { platform: '', url: '' },
  });

  const editForm = useForm({
    resolver: zodResolver(updateSocialSchema),
    defaultValues: { platform: '', url: '' },
  });

  const setPending = (key: string, value: boolean) => setPendingMap(prev => ({ ...prev, [key]: value }));

  const handleCreate = async (data: SocialLink) => {
    setPending('create', true);
    try {
      await onCreate(data);
      newForm.reset();
      setIsAdding(false);
    } finally {
      setPending('create', false);
    }
  };

  const handleUpdate = async (data: SocialLink) => {
    if (!editingId) return;
    const key = `update-${editingId}`;
    setPending(key, true);
    try {
      await onUpdate(editingId, data);
      setEditingId(null);
    } finally {
      setPending(key, false);
    }
  };

  const handleDelete = async (id: number) => {
    const key = `delete-${id}`;
    setPending(key, true);
    try {
      await onDelete(id);
    } finally {
      setPending(key, false);
    }
  };

  const startEditing = (link: SocialLink) => {
    setEditingId(link.id ?? null);
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
                  <div className="flex flex-wrap w-full justify-between gap-4">
                    <FormField
                      control={newForm.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem className="max-w-[250px] w-fit">
                          <FormLabel>Platform</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., LinkedIn, GitHub" />
                          </FormControl>
                          <FormMessage className='text-[12px]'/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={newForm.control}
                      name="url"
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
                    <Button type="button" variant="outline" onClick={() => { setIsAdding(false); newForm.reset(); }}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={pendingMap['create']}>
                      <Save className="w-4 h-4 mr-2" />
                      {pendingMap['create'] ? 'Saving...' : 'Save Link'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {initialLinks?.length > 0 ? (
          initialLinks.map(link => {
            const isEditing = editingId === link.id;
            const updateKey = `update-${link.id}`;
            const deleteKey = `delete-${link.id}`;

            return (
              <Card key={link.id}>
                <CardContent className="pt-6">
                  {isEditing ? (
                    <Form {...editForm}>
                      <form onSubmit={editForm.handleSubmit(handleUpdate)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={editForm.control}
                            name="platform"
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
                          <Button type="submit" disabled={pendingMap[updateKey]}>
                            <Save className="w-4 h-4 mr-2" />
                            {pendingMap[updateKey] ? 'Updating...' : 'Update Link'}
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
                        <Button type="button" variant="ghost" size="icon" onClick={() => startEditing(link)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" disabled={pendingMap[deleteKey]} onClick={() => handleDelete(link.id!)}>
                          {pendingMap[deleteKey] ? <LucideClockFading className="w-4 h-4 text-green-700" /> : <Trash2 className="w-4 h-4 text-destructive" />}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p className="text-rose-600">Social links not added!</p>
        )}
      </CardContent>
    </Card>
  );
}
