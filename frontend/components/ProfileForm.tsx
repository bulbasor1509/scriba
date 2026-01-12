"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { User } from "@/generated/prisma/client";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { updateProfileAction } from "@/actions/user";

const profileSchema = z.object({
    name: z.string().min(6, "name must be atleast 6 characters"),
    bio: z.string(),
});

const ProfileForm = ({user}: {user: User}) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name,
            bio: user.bio,
        },
    });

    function onSubmit(data: z.infer<typeof profileSchema>) {
        startTransition(async () => {
            await updateProfileAction(user.id, data.name, data.bio)
        })
    }

    return (
        <div>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel
                                    htmlFor="name"
                                    className="capitalize text-sm"
                                >
                                    Full Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="name"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="name"
                                    autoComplete="off"
                                    className="outline-none rounded-sm focus-visible:ring-0"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="bio"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel
                                    htmlFor="bio"
                                    className="capitalize text-sm"
                                >
                                    About
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    id="name"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="name"
                                    autoComplete="off"
                                    className="outline-none rounded-sm focus-visible:ring-0"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Field orientation="horizontal">
                            <Button type="submit" className="rounded-sm capitalize text-sm font-light ml-auto">
                                {isPending ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        <span>Updating...</span>
                                    </>
                                ) : (
                                    <span>Update Profile</span>
                                )}
                            </Button>
                        </Field>
                </FieldGroup>
            </form>
        </div>
    );
};

export default ProfileForm