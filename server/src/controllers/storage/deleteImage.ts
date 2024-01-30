import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { deleteImageByUUID } from "../../services/firebase/deleteImageByUUID";

export async function deleteImage(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const bodySchema = z.object({
        imageUUID: z.string()
    })

    const { imageUUID } = bodySchema.parse(request.body);

    await deleteImageByUUID(imageUUID);
    reply.status(204).send();
 
}