import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function deleteProject(request: FastifyRequest, reply: FastifyReply) {
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

    await prisma.project.delete({
        where: {
            id
        }
    })

    reply.status(200).send();
}
