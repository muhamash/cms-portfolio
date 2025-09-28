import { Button } from "@/components/ui/button";

export default async function Home ()
{
  // const users = await prisma.user.findMany( {
  //   select: { id: true, email: true, name: true },
  // } );

  // console.log( users );

  // throw new Error("test")

  return (
    <div className="py-30">
      <p className="text-green-600">hello</p>
      <Button>Click me</Button>
    </div>
  );
}
