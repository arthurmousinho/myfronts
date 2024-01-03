import { FastifyInstance } from "fastify";
import { getAllProjects } from "../controllers/projects/getAllProjects";
import { getProjectById } from "../controllers/projects/getProjectById";
import { createProject } from "../controllers/projects/createProject";
import { updateProject } from "../controllers/projects/updateProject";
import { deleteProject } from "../controllers/projects/deleteProject";

export async function projectsRoutes(app: FastifyInstance) {

    app.get('/projects', getAllProjects);

    app.get('/projects/:id', getProjectById);

    app.post('/projects', createProject);

    app.put('/projects/:id', updateProject);

    app.delete('/projects/:id', deleteProject);

}