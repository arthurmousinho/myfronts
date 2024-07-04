import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export const createProjectSchema = z.object({
    title: z
        .string(),
    image: z
        .any(),
    description: z  
        .string(),
    repositoryURL: z  
        .string()
        .url(),
    projectURL: z
        .string()
        .url()
        .optional(),
    techs: z
        .string()
        .array(),
})