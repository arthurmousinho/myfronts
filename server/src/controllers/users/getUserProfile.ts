import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        username: z.string(),
    });

    const { username } = paramsSchema.parse(request.params);

    console.log("username: " + username);

    const user = await prisma.user.findFirst({
        where: {
            username: username,
        }
    });

    reply.status(200).send(user);
}