"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const newForm = useForm<Partial<Experience>>({
    defaultValues: { position: "", company: "", timeLine: "", description: "" },
  });
  const editForm = useForm<Partial<Experience>>({
    defaultValues: { position: "", company: "", timeLine: "", description: "" },
  });

  const handleCreate = async (data: Omit<Experience, "id">) => {
    await onCreate(data);
    const newExp = { id: Date.now(), ...data };
    setExperiences([...experiences, newExp]);
    newForm.reset();
    setIsAdding(false);
  };

  const handleUpdate = async (data: Omit<Experience, "id">) => {
    if (editingId) {
      await onUpdate(editingId, data);
      setExperiences(
        experiences.map((exp) => (exp.id === editingId ? { ...exp, ...data } : exp))
      );
      setEditingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    await onDelete(id);
    setExperiences(experiences.filter((exp) => exp.id !== id));
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
                  <FormField
                    control={newForm.control}
                    name="timeLine"
                    rules={{ required: "Timeline is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timeline</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 2020 - Present" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                    <Button type="submit">
                      <Save className="w-4 h-4 mr-2" />
                      Save Experience
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* List experiences */}
        <div className="grid grid-cols-1 gap-3">
          {experiences.map((exp) => (
            <Card key={exp.id}>
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
                      <FormField
                        control={editForm.control}
                        name="timeLine"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Timeline</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., 2020 - 2022" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
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
                        <Button type="submit" size="sm">
                          Update
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
                        >
                          <X className="w-3 h-3 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm">{exp.description}</p>
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