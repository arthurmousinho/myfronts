import { FastifyReply, FastifyRequest } from "fastify";
import { projectService } from "../projects.service";

export async function getTrendingProjectsController(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const { getTrendingProjects } = projectService();

    const trendingProjects = await getTrendingProjects();

    reply.status(200).send(trendingProjects);

}