"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateExperienceInput } from "@/lib/types/form.type";
import { createExperienceSchema, updateExperienceSchema } from "@/lib/validations/form.validation";
import { DatePickerWithRange } from "@/modules/layouts/DatePickerWithRange";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, Save, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export interface Experience {
  id?: number;
  position: string;
  company: string;
  timeLine: string;
  description: string;
}

interface ExperienceManagerProps {
  initialExperiences: Experience[];
  onCreate: (data: Omit<Experience, "id">) => Promise<void>;
  onUpdate: (id: number, data: Omit<Experience, "id">) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function ExperienceManager({
  initialExperiences,
  onCreate,
  onUpdate,
  onDelete,
}: ExperienceManagerProps) {

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [pendingMap, setPendingMap] = useState<{ [key: string]: boolean }>({});

  const newForm = useForm<CreateExperienceInput>({
    resolver: zodResolver(createExperienceSchema),
    defaultValues: { position: "", company: "", timeLine: "", description: "" },
  });

  const editForm = useForm<Partial<Experience>>({
    resolver: zodResolver(updateExperienceSchema),
    defaultValues: { position: "", company: "", timeLine: "", description: "" },
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

  const startEditing = (exp: Experience) => {
    setEditingId(exp.id);
    editForm.reset({
      position: exp.position,
      company: exp.company,
      timeLine: exp.timeLine,
      description: exp.description,
    });
  };

  // Helper function to parse date string in YYYY-MM-DD format
  const parseDateFromString = (dateStr: string) => {
    if (!dateStr) return undefined;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return undefined;
    const [year, month, day] = parts.map(Number);
    return new Date(year, month - 1, day);
  };

  // Helper function to format date to YYYY-MM-DD string
  const formatDateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const TimelineField = ({ control, name }: { control: any; name: string }) => (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const [fromStr, toStr] = field.value?.split(" - ") || [];
        const currentRange = fromStr
          ? {
              from: parseDateFromString(fromStr),
              to: toStr ? parseDateFromString(toStr) : undefined,
            }
          : undefined;

        return (
          <FormItem>
            <FormLabel>Timeline</FormLabel>
            <FormControl>
              <DatePickerWithRange
                value={currentRange}
                onChange={(range) => {
                  if (range?.from && range?.to) {
                    field.onChange(`${formatDateToString(range.from)} - ${formatDateToString(range.to)}`);
                  } else if (range?.from) {
                    field.onChange(`${formatDateToString(range.from)}`);
                  } else {
                    field.onChange("");
                  }
                }}
                placeholder="Pick employment period"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>Add, edit, or remove your work experiences</CardDescription>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Add new */}
        {isAdding && (
          <Card className="border-2 border-dashed">
            <CardContent className="pt-6">
              <Form {...newForm}>
                <form onSubmit={newForm.handleSubmit(handleCreate)} className="space-y-4">
                  <FormField
                    control={newForm.control}
                    name="position"
                    rules={{ required: "Position is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Senior Developer" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={newForm.control}
                    name="company"
                    rules={{ required: "Company is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Company name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <TimelineField control={newForm.control} name="timeLine" />
                  <FormField
                    control={newForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} placeholder="Describe your role..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAdding(false);
                        newForm.reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={pendingMap['create']}>
                      <Save className="w-4 h-4 mr-2" />
                      {pendingMap['create'] ? 'Saving...' : 'Save Experience'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* List experiences */}
        <div className="grid grid-cols-1 gap-3">
          {initialExperiences.length > 0 && initialExperiences?.map((exp, index) => {
            const updateKey = `update-${exp.id}`;
            const deleteKey = `delete-${exp.id}`;
            
            return (
              <Card key={exp.id ?? index}>
                <CardContent className="pt-6">
                  {editingId === exp.id ? (
                    <Form {...editForm}>
                      <form onSubmit={editForm.handleSubmit(handleUpdate)} className="space-y-4">
                        <FormField
                          control={editForm.control}
                          name="position"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Position" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={editForm.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Company" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <TimelineField control={editForm.control} name="timeLine" />
                        <FormField
                          control={editForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea {...field} rows={3} placeholder="Role details..." />
                              </FormControl>
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
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{exp.position} at {exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.timeLine}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => startEditing(exp)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => handleDelete(exp.id)} 
                            disabled={pendingMap[deleteKey]}
                          >
                            {pendingMap[deleteKey] ? (
                              <Save className="w-3 h-3 text-green-700 animate-spin" />
                            ) : (
                              <X className="w-3 h-3 text-destructive" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm">{exp.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
          
          {initialExperiences.length === 0 && (
            <p className="text-red-700">Please add experiences</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}