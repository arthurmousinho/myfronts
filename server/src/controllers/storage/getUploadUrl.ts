import { FastifyReply, FastifyRequest } from "fastify"
import { getPresignedBucketUrl } from "../../services/firebase/getPresignedBucketUrl";
import { z } from "zod";

export async function getUploadUrl(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const bodySchema = z.object({
        imageUUID: z.string()
    })

    const { imageUUID } = bodySchema.parse(request.body);

    const presignedUrl = await getPresignedBucketUrl(imageUUID);

    reply.send({ url: presignedUrl })

}