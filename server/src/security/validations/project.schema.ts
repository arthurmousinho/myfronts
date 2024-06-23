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
        .any()
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE, 
            'Max image size is 5MB'
        )
        .refine(
            (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
            `Only ${ACCEPTED_IMAGE_MIME_TYPES.map(type => type)} formats are supported`
        ),
    description: z  
        .string(),
    repositoryURL: z  
        .string()
        .url(),
    projectURL: z
        .string()
        .url(),
    techs: z
        .string()
        .array(),
})