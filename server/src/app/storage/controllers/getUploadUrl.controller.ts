import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod";
import { TokenInfos } from "../../auth/interfaces/TokenInfos.interface";
import { storageService } from "../storage.service";

export async function getUploadUrl(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const { getSignedUrl } = storageService();

    const bodySchema = z.object({
        imageUUID: z.string()
    })

    const { imageUUID } = bodySchema.parse(request.body);

    const decoded: TokenInfos = Object(await request.jwtDecode());
    const username = decoded.username;

    const presignedUrl = await getSignedUrl(imageUUID, username);

    reply.send({ url: presignedUrl })

}