import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function createProject(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        title: z.string(),
        imageURL: z.string(),     
        description: z.string(),  
        repositoryURL: z.string(),
        projectURL: z.string(),  
        techs: z.string().array(),
    });

    const body = bodySchema.parse(request.body);

    const createProject = await prisma.project.create({
        data: {
            title: body.title,
            imageURL: body.imageURL,
            description: body.description,
            repositoryURL: body.repositoryURL,
            projectURL: body.projectURL,
            techs: body.techs,
        }
    });

    reply.status(201).send(createProject);
}