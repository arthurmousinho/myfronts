import { z } from "zod";

export const authUserBodySchema = z.object({
    code: z.string()
});