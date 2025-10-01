import { redirect } from "next/navigation";

export default async function DashBoardPage() {
  redirect("/dashboard/manage-blogs");
}
