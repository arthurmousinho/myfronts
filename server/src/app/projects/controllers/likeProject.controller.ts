import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { projectService } from "../projects.service";
import { TokenInfos } from "../../users/interfaces/TokenInfos.interface";

export async function likeProjectController(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const { likeProject } = projectService();

    const decoded: TokenInfos = Object(await request.jwtDecode());
    const userId = decoded.sub;

    const paramsSchema = z.object({
        id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params);

    await likeProject(id, userId);
    
    reply.status(200).send();

}