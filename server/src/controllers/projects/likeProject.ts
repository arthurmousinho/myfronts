import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function likeProject(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const paramsSchema = z.object({
        id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params);

    const project = await prisma.project.findUniqueOrThrow({
        where: {
            id
        }
    });

    if (!project) {
        reply.status(404).send();
    }

    const currentLikesAmount = project.likes;

    await prisma.project.update({
        where: {
            id
        },
        data: {
            likes: currentLikesAmount + 1,
        }
    })

    reply.status(200).send();

}