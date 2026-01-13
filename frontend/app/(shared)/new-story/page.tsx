"use client";

import { z } from "zod";
import { Controller, Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { storySchema } from "@/types/story";
import { useTransition } from "react";
import postStoryAction from "@/actions/story";
import { Loader2 } from "lucide-react";
import Wrapper from "@/components/Wrapper";

const NewStoryPage = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof storySchema>>({
        resolver: zodResolver(storySchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    function onSubmit(data: z.infer<typeof storySchema>) {
        startTransition(async () => {
            await postStoryAction(data);
        });
    }

    return (
        <Wrapper>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <Input
                                    {...field}
                                    id="title"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Story title"
                                    autoComplete="off"
                                    className="outline-none border-none shadow-none focus-visible:ring-0 text-2xl! font-semibold"
                                />
                            </Field>
                        )}
                    ></Controller>
                </FieldGroup>
                <FieldGroup>
                    <Controller
                        name="content"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <Textarea
                                    {...field}
                                    id="content"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Write your story here..."
                                    autoComplete="off"
                                    className="outline-none border-none shadow-none focus-visible:ring-0 min-h-90"
                                />
                            </Field>
                        )}
                    ></Controller>
                </FieldGroup>
                <FieldGroup>
                    <div className="ml-auto">
                        <Button
                            disabled={isPending}
                            className="capitalize rounded-sm"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>posting</span>
                                </>
                            ) : (
                                <span>post</span>
                            )}
                        </Button>
                    </div>
                </FieldGroup>
            </form>
        </Wrapper>
    );
};

export default NewStoryPage;
