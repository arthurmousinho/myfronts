import { FastifyInstance } from "fastify";
import { getAllProjects } from "./controllers/getAllProjects.controller";
import { getProjectById } from "./controllers/getProjectById.controller";
import { getTrendingProjects } from "./controllers/getTrendingProjects.controller";
import { createProject } from "./controllers/createProject.controller";
import { updateProject } from "./controllers/updateProject.controller";
import { likeProject } from "./controllers/likeProject.controller";
import { deleteProject } from "./controllers/deleteProject.controller";

export async function projectsRoutes(app: FastifyInstance) {

    app.get('/projects', getAllProjects);

    app.get('/projects/:id', getProjectById);

    app.get('/projects/trending', getTrendingProjects);

    app.post('/projects', createProject);

    app.put('/projects/:id', updateProject);

    app.patch('/projects/like/:id', likeProject);
    
    app.delete('/projects/:id', deleteProject);

}