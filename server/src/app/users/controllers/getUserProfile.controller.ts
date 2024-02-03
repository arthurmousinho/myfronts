import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { getUserProjects } from "../../projects/services/getUserProjects";

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        username: z.string(),
    });

    const { username } = paramsSchema.parse(request.params);

    const user = await prisma.user.findFirst({
        where: {
            username: username,
        }
    });

    if (!user) {
        reply.status(404).send();
        return;
    };

    const projects = await getUserProjects(user.id);
    const data = {
        ...user,
        projects: projects
    };

    reply.status(200).send(data);

}