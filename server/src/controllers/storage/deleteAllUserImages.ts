import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { tokenInfos } from "../../server";
import { deleteImageByUUID } from "../../services/firebase/deleteImageByUUID";

export async function deleteAllUserImage(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const decoded: tokenInfos = Object(await request.jwtDecode());

    const paramsSchema = z.object({
        userId: z.string().uuid(),
    });

    const { userId } = paramsSchema.parse(request.params);

    // when userId from token is different than the userId form url
    if (userId != decoded.sub) {
        reply.status(401).send(); 
    } 

    const projects = await prisma.project.findMany({
        where: {
            userId
        }
    })

    const UUIDs = projects.map(project => project.imageUUID);

    await Promise.all(UUIDs.map(async (uuid) => {
        await deleteImageByUUID(uuid);
    }));

    reply.status(204).send();

}