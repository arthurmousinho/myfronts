import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { tokenInfos } from "../../server";

export async function updateProject(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify()

    const paramsSchema = z.object({
        id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
        title: z.string(),
        imageURL: z.string(),     
        description: z.string(),  
        repositoryURL: z.string(),
        projectURL: z.string(),  
        techs: z.string().array(),
    })

    const body = bodySchema.parse(request.body);

    await prisma.project.findUniqueOrThrow({
        where: {
            id
        }
    });

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