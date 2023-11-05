import { FastifyInstance } from "fastify";
import { getAllProjects } from "./getAllProjects";
import { getProjectById } from "./getProjectById";
import { createProject } from "./createProject";
import { updateProject } from "./updateProject";
import { deleteProject } from "./deleteProject";

export async function projectsRoutes(app: FastifyInstance) {

    app.get('/projects', getAllProjects);

    app.get('/projects/:id', getProjectById);

    app.post('/projects', createProject);

    app.put('/projects/:id', updateProject);

    app.delete('/projects/:id', deleteProject);

}