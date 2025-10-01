"use server"

export const getAllProjects = async () =>
{
  const res = await fetch(`${process.env.BACKEND_URL}/v1/projects/all-projects`, {
    cache: "no-store",
    next: {
      tags: ["PROJECTS"], 
    },
  });

  const result = await res.json();
  return result.data;
};

export const getProjectById = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL}/v1/projects/get-project/${id}`, {
    cache: "no-store",
    next: {
      tags: ["PROJECTS"], 
    },
  });

  const project = await res.json();
  return project.data;
};
