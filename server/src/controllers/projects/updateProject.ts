import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function updateProject(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify()

    const paramsSchema = z.object({
        id: z.string().uuid(),
    })

    const bodySchema = z.object({
        title: z.string(),
        imageURL: z.string(),     
        description: z.string(),  
        repositoryURL: z.string(),
        projectURL: z.string(),  
        techs: z.string().array(),
    })

    const { id } = paramsSchema.parse(request.params);
    const body = bodySchema.parse(request.body);

    const project = await prisma.project.findUniqueOrThrow({
        where: {
            id
        }
    });

    if (!project) {
        reply.status(404).send();
    }

    const updatedProject = await prisma.project.update({
        where: {
            id,
        },
        data: {
            title: body.title,
            imageURL: body.imageURL,
            description: body.description,
            repositoryURL: body.repositoryURL,
            projectURL: body.projectURL,
            techs: body.techs,
        }
    });

    reply.status(200).send(updatedProject);
}