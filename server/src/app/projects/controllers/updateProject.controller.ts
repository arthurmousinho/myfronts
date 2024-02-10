import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { projectService } from "../projects.service";
import { ProjectData } from "../interfaces/ProjectData";
import { TokenInfos } from "../../users/interfaces/TokenInfos.interface";

export async function updateProjectController(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify()

    const { updateProject } = projectService();

    const paramsSchema = z.object({
        id: z.string().uuid(),
    })

    const decoded: TokenInfos = Object(await request.jwtDecode());
    const userId = decoded.sub;

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
        title: z.string(),
        imageURL: z.string(),     
        description: z.string(),  
        repositoryURL: z.string(),
        projectURL: z.string(),  
        techs: z.string().array(),
        imageUUID: z.string(),
    })

    const body = bodySchema.parse(request.body);

    const projectData: ProjectData = {
        id,
        userId,
        title: body.title,
        imageURL: body.imageURL,     
        description: body.description,  
        repositoryURL: body.repositoryURL,
        projectURL: body.projectURL,  
        techs: body.techs,
        imageUUID: body.imageUUID,
    }

    await updateProject(projectData, userId)

    reply.status(200);
}