import { z } from "zod";

export const getRepoInfosParamsSchema = z.object({
    repoName: z.string()
})