import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { tokenInfos } from "../../server";

export async function deleteProject(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const paramsSchema = z.object({
        id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params);

    const decoded: tokenInfos = Object(await request.jwtDecode());
    const userId = decoded.sub;

    const project = await prisma.project.findUniqueOrThrow({
        where: {
            id,
            userId,
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
