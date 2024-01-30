import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { deleteImageByUUID } from "../services/deleteImageByUUID.service";

export async function deleteImage(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const paramsSchema = z.object({
        imageUUID: z.string().uuid(),
    });

    const { imageUUID } = paramsSchema.parse(request.params);

    await deleteImageByUUID(imageUUID);
    
    reply.status(204).send();

}