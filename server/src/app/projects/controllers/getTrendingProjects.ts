import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function getTrendingProjects(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const trendingProjects = await prisma.project.findMany({
        where: {
            likes: {
                gte: 1
            }
        },
        orderBy: {
            likes: "desc"
        }
    })

    reply.status(200).send(trendingProjects);

}