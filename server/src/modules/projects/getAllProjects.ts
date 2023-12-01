import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getAllProjects(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify()

    const projects = await prisma.project.findMany({
        orderBy: {
            createdAt: 'asc'
        }
    });
    reply.status(200).send(projects);
}