import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { storageService } from "../storage.service";
import { TokenInfos } from "../../auth/interfaces/TokenInfos.interface";

export async function deleteImage(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const { deleteImageByUUID } = storageService();

    const paramsSchema = z.object({
        imageUUID: z.string().uuid(),
    });

    const { imageUUID } = paramsSchema.parse(request.params);

    const decoded: TokenInfos = Object(await request.jwtDecode());
    const username = decoded.username;

    await deleteImageByUUID(imageUUID, username);
    
    reply.status(204).send();

}