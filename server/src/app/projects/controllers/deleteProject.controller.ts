import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { projectService } from "../projects.service";
import { TokenInfos } from "../../users/interfaces/TokenInfos.interface";

export async function deleteProjectController(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const { deleteProject } = projectService();

    const paramsSchema = z.object({
        id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params);

    const decoded: TokenInfos = Object(await request.jwtDecode());

    const userId = decoded.sub;

    await deleteProject(id, userId);

    reply.status(200).send();
    
}
