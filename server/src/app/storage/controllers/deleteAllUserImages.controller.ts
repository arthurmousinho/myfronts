import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { TokenInfos } from "../../auth/interfaces/TokenInfos.interface";
import { storageService } from "../storage.service";

export async function deleteAllUserImage(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const { deleteImageByUUID } = storageService();

    const decoded: TokenInfos = Object(await request.jwtDecode());
    const username = decoded.username;

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
        await deleteImageByUUID(uuid, username);
    }));

    reply.status(204).send();

}