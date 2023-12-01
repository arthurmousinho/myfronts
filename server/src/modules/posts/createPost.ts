import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { tokenInfos } from "../../server";
import { prisma } from "../../lib/prisma";

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
    
    const decoded: tokenInfos = Object(await request.jwtDecode());
    const userId = decoded.sub;

    const bodySchema = z.object({
        projectId: z.string(),
        description: z.string(),
    });

    const { projectId, description } = bodySchema.parse(request.body);

    // check if the projectId owned to usedId
    await prisma.project.findUniqueOrThrow({
        where: {
            id: projectId,
            userId
        }
    });

    const createdPost = await prisma.post.create({
        data: {
            description: description,
            likes: 0,
            projectId: projectId,
            userId
        }
    });

    reply.status(201).send(createdPost);
}