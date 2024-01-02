import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function getProjectById(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const project = await prisma.project.findUniqueOrThrow({
        where: {
            id,
        }
    });

    reply.status(200).send(project);
}