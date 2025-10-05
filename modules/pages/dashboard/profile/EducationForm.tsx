"use client";

import { Button } from "@/components/ui/button";
import
  {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import
  {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createEducationSchema, updateEducationSchema } from "@/lib/validations/form.validation";
import { DatePickerWithRange } from "@/modules/layouts/DatePickerWithRange";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, Save, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export interface Education {
  id?: number;
  degree: string;
  institute: string;
  timeLine: string;
  description: string;
}

interface EducationManagerProps {
  initialEducation: Education[];
  onCreate: (data: Omit<Education, "id">) => Promise<void>;
  onUpdate: (id: number, data: Omit<Education, "id">) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function EducationManager({
  initialEducation,
  onCreate,
  onUpdate,
  onDelete,
}: EducationManagerProps) {
  const [pendingMap, setPendingMap] = useState<{ [key: string]: boolean }>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const newForm = useForm<{ degree: string; institute: string; timeLine: string; description?: string; }>({
    resolver: zodResolver(createEducationSchema),
    defaultValues: { degree: "", institute: "", timeLine: "", description: "" },
  });

  const editForm = useForm<Partial<Education>>({
    resolver: zodResolver(updateEducationSchema),
    defaultValues: { degree: "", institute: "", timeLine: "", description: "" },
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

  const startEditing = (edu: Education) => {
    setEditingId(edu.id);
    editForm.reset({
      degree: edu.degree,
      institute: edu.institute,
      timeLine: edu.timeLine,
      description: edu.description,
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
            <CardTitle>Education</CardTitle>
            <CardDescription>
              Add, edit, or remove your education history
            </CardDescription>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Education
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
                <form
                  onSubmit={newForm.handleSubmit(handleCreate)}
                  className="space-y-4"
                >
                  <FormField
                    control={newForm.control}
                    name="degree"
                    rules={{ required: "Degree is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., BSc in CSE" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={newForm.control}
                    name="institute"
                    rules={{ required: "Institute is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institute</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="University name" />
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
                          <Textarea
                            {...field}
                            rows={3}
                            placeholder="Describe your program..."
                          />
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
                      {pendingMap['create'] ? 'Saving...' : 'Save Education'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* List education */}
        <div className="grid grid-cols-1 gap-3">
          {initialEducation?.length > 0 && initialEducation?.map((edu) => {
            const updateKey = `update-${edu.id}`;
            const deleteKey = `delete-${edu.id}`;

            return (
              <Card key={edu.id}>
                <CardContent className="pt-6">
                  {editingId === edu.id ? (
                    <Form {...editForm}>
                      <form
                        onSubmit={editForm.handleSubmit(handleUpdate)}
                        className="space-y-4"
                      >
                        <FormField
                          control={editForm.control}
                          name="degree"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Degree</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Degree" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={editForm.control}
                          name="institute"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institute</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Institute" />
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
                                <Textarea {...field} rows={3} placeholder="Details..." />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingId(null)}
                          >
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
                          <p className="font-medium">
                            {edu.degree} at {edu.institute}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {edu.timeLine}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => startEditing(edu)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => handleDelete(edu.id)} 
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
                      <p className="text-sm">{edu.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {initialEducation?.length === 0 && (
            <p className="text-red-700">Please add education</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}