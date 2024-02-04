import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { projectService } from "../projects.service";

export async function getProjectById(request: FastifyRequest, reply: FastifyReply) {

    const paramsSchema = z.object({
        id: z.string().uuid(),
    });

    const { getProjectById } = projectService();

    const { id } = paramsSchema.parse(request.params);

    const project = await getProjectById(id);

    reply.status(200).send(project);
}