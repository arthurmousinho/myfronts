import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { tokenInfos } from "../../server";

export async function likeProject(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const decoded: tokenInfos = Object(await request.jwtDecode());
    const userId = decoded.sub;

    console.log("like request by: " + userId)

    const paramsSchema = z.object({
        id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params);

    await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    })

    const project = await prisma.project.findUniqueOrThrow({
        where: {
            id
        }
    });

    const currentLikesAmount = project.likes;

    await prisma.project.update({
        where: {
            id
        },
        data: {
            likes: currentLikesAmount + 1,
            likedBy: [...project.likedBy, userId],
        }
    })

    reply.status(200).send();

}