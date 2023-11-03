import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function projectsRoutes(app: FastifyInstance) {

    app.get('/projects', async (request, reply) => {
        const projects = await prisma.project.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });
        reply.status(200).send(projects);
    })

    app.get('/projects/:id', async (resquest, reply) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });

        const { id } = paramsSchema.parse(resquest.params);

        const project = await prisma.project.findFirstOrThrow({
            where: {
                id,
            }
        });

        reply.status(200).send(project);
    })

    app.post('/projects', async (request, reply) => {
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
    })

    app.put('/projects/:id', async (request, reply) => {
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
    })

    app.delete('/projects/:id', async (request, reply) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params);

        const project = await prisma.project.findUniqueOrThrow({
            where: {
                id
            }
        });

        if (!project) {
            reply.status(404).send();
        }

        await prisma.project.delete({
            where: {
                id
            }
        })

        reply.status(200).send();
    })

}