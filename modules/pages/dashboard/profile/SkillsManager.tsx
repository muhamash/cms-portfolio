"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { skillSchema } from '@/lib/validations/form.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Plus, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Skill {
  id: number;
  name: string;
}

interface SkillsManagerProps {
  initialSkills: Skill[];
  onCreate: (data: Omit<Skill, 'id'>) => Promise<void>;
  onUpdate: (id: number, data: Omit<Skill, 'id'>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function SkillsManager({ initialSkills, onCreate, onUpdate, onDelete }: SkillsManagerProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [pendingMap, setPendingMap] = useState<{ [key: string]: boolean }>({});

  const newForm = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: '' },
  });

  const editForm = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: '' },
  });

  const setPending = (key: string, value: boolean) => setPendingMap(prev => ({ ...prev, [key]: value }));

  const handleCreate = async (data: any) => {
    setPending('create', true);
    try {
      await onCreate(data);
      newForm.reset();
      setIsAdding(false);
    } finally {
      setPending('create', false);
    }
  };

  const handleUpdate = async (data: any) => {
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

  const startEditing = (skill: Skill) => {
    setEditingId(skill.id);
    editForm.reset({ name: skill.name });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Skills</CardTitle>
            <CardDescription>List your technical and professional skills</CardDescription>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Skill
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
                  <FormField
                    control={newForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., React, Python, Design" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => { setIsAdding(false); newForm.reset(); }}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={pendingMap['create']}>
                      <Save className="w-4 h-4 mr-2" />
                      {pendingMap['create'] ? 'Saving...' : 'Save Skill'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {initialSkills.length > 0 ? initialSkills.map(skill => {
            const isEditing = editingId === skill.id;
            const updateKey = `update-${skill.id}`;
            const deleteKey = `delete-${skill.id}`;

            return (
              <Card key={skill.id}>
                <CardContent className="pt-6">
                  {isEditing ? (
                    <Form {...editForm}>
                      <form onSubmit={editForm.handleSubmit(handleUpdate)} className="space-y-3">
                        <FormField
                          control={editForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder="Skill name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" size="sm" onClick={() => setEditingId(null)}>
                            Cancel
                          </Button>
                          <Button type="submit" size="sm" disabled={pendingMap[updateKey]}>
                            {pendingMap[updateKey] ? 'Updating...' : 'Update'}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <div className="flex gap-1">
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEditing(skill)}>
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(skill.id)} disabled={pendingMap[deleteKey]}>
                          {pendingMap[deleteKey] ? <Save className="w-3 h-3 text-green-700 animate-spin" /> : <X className="w-3 h-3 text-destructive" />}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          }) : (
            <p className="text-red-700">Please add some skills</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
