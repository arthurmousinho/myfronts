import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {

    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })    

    reply.status(200).send(posts)

}