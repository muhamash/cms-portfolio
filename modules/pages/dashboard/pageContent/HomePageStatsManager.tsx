"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { headerStats, updateHeaderStats } from '@/lib/validations/form.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Plus, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface HomePageStat {
  id: number;
  label: string;
  value: string;
  homePageId: number;
}

interface HomePageStatsManagerProps {
  initialStats: HomePageStat[];
  onCreate: (data: { label: string; value: string }) => Promise<void>;
  onUpdate: (id: number, data: { label: string; value: string }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function HomePageStatsManager({ 
  initialStats, 
  onCreate, 
  onUpdate, 
  onDelete 
}: HomePageStatsManagerProps) {
  const [pendingMap, setPendingMap] = useState<{ [key: string]: boolean }>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  console.log(initialStats)

  const newForm = useForm( {
    resolver: zodResolver(headerStats),
    defaultValues: { label: '', value: '' }
  } );

  const editForm = useForm( {
    resolver: zodResolver(updateHeaderStats),
    defaultValues: { label: '', value: '' }
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

  const startEditing = ( stat: HomePageStat ) =>
  {
    setEditingId( stat.id );
    editForm.reset( {
      label: stat.label,
      value: stat.value
    } );
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>HomePage Statistics</CardTitle>
            <CardDescription>
              Manage statistics displayed on your homepage
            </CardDescription>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding( true )}>
              <Plus className="w-4 h-4 mr-2" />
              Add Stat
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
                    name="label"
                    rules={{ required: 'Label is required' }}
                    render={( { field } ) => (
                      <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Projects Completed" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={newForm.control}
                    name="value"
                    rules={{ required: 'Value is required' }}
                    render={( { field } ) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 50+" />
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
                      {pendingMap[ 'create' ] ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        <div className="rounded-md border">
          <div className="grid grid-cols-3 bg-muted p-4 font-medium">
            <div>Label</div>
            <div>Value</div>
            <div className="text-right">Actions</div>
          </div>
          {initialStats.length > 0 && initialStats.map( ( stat ) =>
          {
            const isEditing = editingId === stat.id;
            const updateKey = `update-${ stat.id }`;
            const deleteKey = `delete-${ stat.id }`;

            return (
              <div key={stat.id} className="grid grid-cols-3 p-4 border-t items-center">
                {editingId === stat.id ? (
                  <div className="col-span-3">
                    <Form {...editForm}>
                      <form onSubmit={editForm.handleSubmit( handleUpdate )} className="space-y-3">
                        <FormField
                          control={editForm.control}
                          name="label"
                          rules={{ required: 'Label is required' }}
                          render={( { field } ) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder="Label" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={editForm.control}
                          name="value"
                          rules={{ required: 'Value is required' }}
                          render={( { field } ) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder="Value" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingId( null )}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" size="sm" disabled={pendingMap[ updateKey ]}>
                            {pendingMap[ updateKey ] ? 'Updating...' : 'Update'}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                ) : (
                  <>
                    <div className="font-medium">{stat.label}</div>
                    <div>{stat.value}</div>
                    <div className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditing( stat )}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete( stat.id )} disabled={pendingMap[ deleteKey ]}>
                        {pendingMap[ deleteKey ] ? <Save className="w-3 h-3 text-green-700 animate-spin" /> : <X className="w-3 h-3 text-destructive" />}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )
          } )}
          {
            initialStats.length === 0 && <p className='text-rose-700 p-3'>Please add some stats</p>
          }
        </div>
      </CardContent>
    </Card>
  );
}
