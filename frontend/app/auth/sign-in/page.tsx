"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";


const SignInSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(5, "password must be atleast 5 characters")
        .max(12, "password must be atmost 12 characters"),
});

const SignInPage = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>();

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof SignInSchema>) {
        startTransition(async () => {
            const result = await signIn.email({
                email: data.email,
                password: data.password,
            });

            if (result.error) setError(result.error.message);
            else router.push("/");
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 space-y-4">
                <div>
                    <div className="text-xl font-semibold capitalize">Sign In</div>
                    <div className="text-sm capitalize text-gray-600">enter your credentials to sign in</div>
                </div>
                <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email" className="capitalize text-sm">
                                        email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="email id"
                                        autoComplete="off"
                                        className="outline-none rounded-none focus-visible:ring-0"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="password" className="capitalize text-sm">
                                        password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="password"
                                        autoComplete="off"
                                        className="outline-none rounded-none focus-visible:ring-0"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Field orientation="horizontal">
                            <Button type="submit" className="w-full rounded-none uppercase text-sm font-light">
                                {isPending ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        <span>Loading...</span>
                                    </>
                                ) : (
                                    <span>Sign In</span>
                                )}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;
