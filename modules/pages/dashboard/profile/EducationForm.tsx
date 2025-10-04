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
  const [education, setEducation] = useState<Education[]>(initialEducation);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const newForm = useForm<Partial<Education>>({
    defaultValues: { degree: "", institute: "", timeLine: "", description: "" },
  });

  const editForm = useForm<Partial<Education>>({
    defaultValues: { degree: "", institute: "", timeLine: "", description: "" },
  });

  const handleCreate = async (data: Omit<Education, "id">) => {
    await onCreate(data);
    const newEdu = { id: Date.now(), ...data };
    setEducation([...education, newEdu]);
    newForm.reset();
    setIsAdding(false);
  };

  const handleUpdate = async (data: Omit<Education, "id">) => {
    if (editingId) {
      await onUpdate(editingId, data);
      setEducation(
        education.map((edu) =>
          edu.id === editingId ? { ...edu, ...data } : edu
        )
      );
      setEditingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    await onDelete(id);
    setEducation(education.filter((edu) => edu.id !== id));
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
                  <FormField
                    control={newForm.control}
                    name="timeLine"
                    rules={{ required: "Timeline is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timeline</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 2015 - 2019" />
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
                    <Button type="submit">
                      <Save className="w-4 h-4 mr-2" />
                      Save Education
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* List education */}
        <div className="grid grid-cols-1 gap-3">
          {education.map((edu) => (
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
                      <FormField
                        control={editForm.control}
                        name="timeLine"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Timeline</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., 2015 - 2019" />
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
                        >
                          <X className="w-3 h-3 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm">{edu.description}</p>
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
