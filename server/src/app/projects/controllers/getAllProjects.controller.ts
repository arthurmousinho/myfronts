import { FastifyReply, FastifyRequest } from "fastify";
import { projectService } from "../projects.service";
import { TokenInfos } from "../../users/interfaces/TokenInfos.interface";

export async function getAllProjectsController(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const { getAllUserProjects } = projectService();

    const decoded: TokenInfos = Object(await request.jwtDecode());
    const userId = decoded.sub;

    const projects = await getAllUserProjects(userId);
    
    reply.status(200).send(projects);
}