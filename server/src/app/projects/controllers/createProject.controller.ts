import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { projectService } from "../projects.service";
import { ProjectData } from "../interfaces/ProjectData";
import { TokenInfos } from "../../users/interfaces/TokenInfos.interface";

export async function createProjectController(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const { createProject } = projectService();

    const decoded: TokenInfos = Object(await request.jwtDecode());
    const userId = decoded.sub;

    const bodySchema = z.object({
        title: z.string(),
        imageURL: z.string(),  
        imageUUID: z.string(),   
        description: z.string(),  
        repositoryURL: z.string(),
        projectURL: z.string(),  
        techs: z.string().array(),
    });

    const body = bodySchema.parse(request.body);

    const newProject: ProjectData = {
        userId: userId,
        title: body.title,
        imageUUID: body.imageUUID,
        imageURL: body.imageURL,
        description: body.description,
        repositoryURL: body.repositoryURL,
        projectURL: body.projectURL,
        techs: body.techs,
        likes: 0,
    }

    await createProject(newProject);

    reply.status(201).send(createProject);
}