"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { headerSkillSchema } from '@/lib/validations/form.validation';
import { zodResolver } from '@hookform/resolvers/zod';
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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [ isAdding, setIsAdding ] = useState( false );
  const [pendingMap, setPendingMap] = useState<{ [key: string]: boolean }>({});

  const newForm = useForm( {
    resolver: zodResolver(headerSkillSchema),
    defaultValues: { skill: '' }
  } );
  
  const editForm = useForm( {
    resolver: zodResolver(headerSkillSchema),
    defaultValues: { skill: '' }
  } );

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
            <Button onClick={() => setIsAdding( true )}>
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
                <form onSubmit={newForm.handleSubmit( handleCreate )} className="space-y-4">
                  <FormField
                    control={newForm.control}
                    name="skill"
                    rules={{ required: 'Skill is required' }}
                    render={( { field } ) => (
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
                    <Button type="button" variant="outline" onClick={() =>
                    {
                      setIsAdding( false );
                      newForm.reset();
                    }}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={pendingMap[ 'create' ]}>
                      <Save className="w-4 h-4 mr-2" />
                      {pendingMap[ 'create' ] ? 'Saving...' : 'Save Skill'}
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
          {initialSkills.length > 0 && initialSkills?.map( ( skill ) =>
          {
            const isEditing = editingId === skill.id;
            const updateKey = `update-${ skill.id }`;
            const deleteKey = `delete-${ skill.id }`;

            return (
              <div key={skill.id} className="grid grid-cols-2 p-4 border-t items-center">
                {editingId === skill.id ? (
                  <div className="col-span-2">
                    <Form {...editForm}>
                      <form onSubmit={editForm.handleSubmit( handleUpdate )} className="flex gap-2">
                        <FormField
                          control={editForm.control}
                          name="skill"
                          rules={{ required: 'Skill is required' }}
                          render={( { field } ) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input {...field} placeholder="Skill name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" size="sm" disabled={pendingMap[ updateKey ]}>
                          {pendingMap[ updateKey ] ? 'Updating...' : 'Update'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => setEditingId( null )}
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
                        onClick={() => startEditing( skill )}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete( skill.id )} disabled={pendingMap[ deleteKey ]}>
                        {pendingMap[ deleteKey ] ? <Save className="w-3 h-3 text-green-700 animate-spin" /> : <X className="w-3 h-3 text-destructive" />}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )
          } )}
          {
            initialSkills.length === 0 && <p className='text-red-700 p-3'>Please add some skills</p>
          }
        </div>
      </CardContent>
    </Card>
  );
}