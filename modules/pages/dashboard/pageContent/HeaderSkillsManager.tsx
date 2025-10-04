"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Edit, Plus, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface HeaderSkill {
  id: number;
  skill: string;
  homePageId: number;
}

interface HeaderSkillsManagerProps {
  initialSkills: HeaderSkill[];
  onCreate: (data: { skill: string }) => Promise<void>;
  onUpdate: (id: number, data: { skill: string }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function HeaderSkillsManager({ 
  initialSkills, 
  onCreate, 
  onUpdate, 
  onDelete 
}: HeaderSkillsManagerProps) {
  const [skills, setSkills] = useState<HeaderSkill[]>(initialSkills);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const newForm = useForm({ defaultValues: { skill: '' } });
  const editForm = useForm({ defaultValues: { skill: '' } });

  const handleCreate = async (data: any) => {
    await onCreate(data);
    const newSkill = { id: Date.now(), skill: data.skill, homePageId: 1 };
    setSkills([...skills, newSkill]);
    newForm.reset();
    setIsAdding(false);
  };

  const handleUpdate = async (data: any) => {
    if (editingId) {
      await onUpdate(editingId, data);
      setSkills(skills.map(skill => 
        skill.id === editingId ? { ...skill, skill: data.skill } : skill
      ));
      setEditingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    await onDelete(id);
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const startEditing = (skill: HeaderSkill) => {
    setEditingId(skill.id);
    editForm.reset({ skill: skill.skill });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Header Skills</CardTitle>
            <CardDescription>
              Manage your skills displayed on the homepage
            </CardDescription>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
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
                    name="skill"
                    rules={{ required: 'Skill is required' }}
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

        <div className="rounded-md border">
          <div className="grid grid-cols-2 bg-muted p-4 font-medium">
            <div>Skill</div>
            <div className="text-right">Actions</div>
          </div>
          {skills.map((skill) => (
            <div key={skill.id} className="grid grid-cols-2 p-4 border-t items-center">
              {editingId === skill.id ? (
                <div className="col-span-2">
                  <Form {...editForm}>
                    <form onSubmit={editForm.handleSubmit(handleUpdate)} className="flex gap-2">
                      <FormField
                        control={editForm.control}
                        name="skill"
                        rules={{ required: 'Skill is required' }}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} placeholder="Skill name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" size="icon">
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => setEditingId(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </form>
                  </Form>
                </div>
              ) : (
                <>
                  <div className="font-medium">{skill.skill}</div>
                  <div className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditing(skill)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(skill.id)}
                    >
                      <X className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}