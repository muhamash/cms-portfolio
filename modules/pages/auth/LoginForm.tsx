"use client";

import { Button } from "@/components/ui/button";
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
import { handleSignIn } from "@/lib/utils/auth.util";
import { loginSchema } from "@/lib/validations/form.validation";
import { errorMessages } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginForm() {
    const form = useForm<{ email: string; password: string; }>( {
        resolver: zodResolver( loginSchema ),
        defaultValues: {
            email: "",
            password: "",
        },
    } );

    const [ isPending, startTransition ] = useTransition();
    const router = useRouter();

    const onSubmit = ( values: { email: string; password: string; } ) =>
    {
        startTransition( async () =>
        {
            try
            {
                const res = await handleSignIn( values );
                console.log(res)

                if ( res?.success )
                {
                    toast.success( res?.message )
                    router.push("/dashboard")
                }
                else
                {
                    const msg = errorMessages[ res.message ] || errorMessages.default;
                    
                    toast.error( msg )
                }
            }
            catch ( err: any )
            {
                console.error( err );
                toast.error( err?.message || "Unexpected error!" )
            }
        } );
    };
    
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center">Login</h2>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit" className="w-full mt-2 cursor-pointer bg-purple-800">
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
