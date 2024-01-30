import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../lib/prisma";
import { TokenInfos } from "../../auth/interfaces/TokenInfos.interface";

export async function getAllProjects(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify()

    const decoded: TokenInfos = Object(await request.jwtDecode());
    const userId = decoded.sub;

    const projects = await prisma.project.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
    
    reply.status(200).send(projects);
}