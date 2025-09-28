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
import { loginSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function LoginForm() {
    const form = useForm<FieldValues>( {
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    } );

    const [ isPending, startTransition ] = useTransition();

    const onSubmit = async ( values: FieldValues ) =>
    {
        try
        {
            startTransition( async() =>
            {
                console.log(values)
                signIn( "credentials", {
                    ...values,
                    // callback for successful login
                    callbackUrl: "/dashboard",
                } );
                
            } )
        } catch ( err: unknown )
        {
            console.error( err );
        }
    };

    const handleSocialLogin = ( provider: "google" | "github" ) =>
    {
        console.log( `Login with ${ provider }` );
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit( onSubmit )}
                className="space-y-6 w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center">Login</h2>

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={( { field } ) => (
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

                <Button disabled={isPending} type="submit" className="w-full mt-2">
                    {isPending ? "working on..." : "Login"}
                </Button>
            </form>
        </Form>
    );
}