"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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

export function SkillsManager({ 
  initialSkills, 
  onCreate, 
  onUpdate, 
  onDelete 
}: SkillsManagerProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const newForm = useForm({ defaultValues: { name: '' } });
  const editForm = useForm({ defaultValues: { name: '' } });

  const handleCreate = async (data: any) => {
    await onCreate(data);
    const newSkill = { id: Date.now(), ...data };
    setSkills([...skills, newSkill]);
    newForm.reset();
    setIsAdding(false);
  };

  const handleUpdate = async (data: any) => {
    if (editingId) {
      await onUpdate(editingId, data);
      setSkills(skills.map(skill => 
        skill.id === editingId ? { ...skill, ...data } : skill
      ));
      setEditingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    await onDelete(id);
    setSkills(skills.filter(skill => skill.id !== id));
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
                    rules={{ required: 'Skill name is required' }}
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
                    <Button type="button" variant="outline" onClick={() => {
                      setIsAdding(false);
                      newForm.reset();
                    }}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="w-4 h-4 mr-2" />
                      Save Skill
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((skill) => (
            <Card key={skill.id}>
              <CardContent className="pt-6">
                {editingId === skill.id ? (
                  <Form {...editForm}>
                    <form onSubmit={editForm.handleSubmit(handleUpdate)} className="space-y-3">
                      <FormField
                        control={editForm.control}
                        name="name"
                        rules={{ required: 'Skill name is required' }}
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
                        <Button type="submit" size="sm">
                          Update
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => startEditing(skill)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDelete(skill.id)}
                      >
                        <X className="w-3 h-3 text-destructive" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}