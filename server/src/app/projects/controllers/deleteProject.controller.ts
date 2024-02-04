import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { TokenInfos } from "../../auth/interfaces/TokenInfos.interface";
import { projectService } from "../projects.service";

export async function deleteProject(request: FastifyRequest, reply: FastifyReply) {

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
