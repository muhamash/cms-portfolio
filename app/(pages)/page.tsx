import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function Home ()
{
  const users = await prisma.user.findUnique( {
    where: {
      email: "test@test.com"
    }
  });

  console.log( users );

  // throw new Error("test")

  return (
    <div>
      <p className="text-green-600">hello</p>
      <Button>Click me</Button>
    </div>
  );
}
