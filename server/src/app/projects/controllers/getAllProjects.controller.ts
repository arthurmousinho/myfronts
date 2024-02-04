import { FastifyReply, FastifyRequest } from "fastify";
import { TokenInfos } from "../../auth/interfaces/TokenInfos.interface";
import { projectService } from "../projects.service";

export async function getAllProjects(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const { getAllUserProjects } = projectService();

    const decoded: TokenInfos = Object(await request.jwtDecode());
    const userId = decoded.sub;

    const projects = await getAllUserProjects(userId);
    
    reply.status(200).send(projects);
}