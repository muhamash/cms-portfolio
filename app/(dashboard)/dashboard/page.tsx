import { redirect } from "next/navigation";

export default async function DashBoardPage() {
  redirect("/dashboard/create-blog");
}
