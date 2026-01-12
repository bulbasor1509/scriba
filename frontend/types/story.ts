import { z } from "zod";

export const storySchema = z.object({
    title: z.string(),
    content: z.string(),
});
