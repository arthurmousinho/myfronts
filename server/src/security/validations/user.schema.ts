import { z } from "zod";

export const authUserBodySchema = z.object({
    code: z.string(),
});

export const getUserProfileParamSchema = z.object({
    username: z.string(),
});