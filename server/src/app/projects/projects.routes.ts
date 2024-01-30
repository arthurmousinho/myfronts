import { FastifyInstance } from "fastify";
import { getAllProjects } from "./controllers/getAllProjects";
import { getProjectById } from "./controllers/getProjectById";
import { getTrendingProjects } from "./controllers/getTrendingProjects";
import { createProject } from "./controllers/createProject";
import { updateProject } from "./controllers/updateProject";
import { likeProject } from "./controllers/likeProject";
import { deleteProject } from "./controllers/deleteProject";

export async function projectsRoutes(app: FastifyInstance) {

    app.get('/projects', getAllProjects);

    app.get('/projects/:id', getProjectById);

    app.get('/projects/trending', getTrendingProjects);

    app.post('/projects', createProject);

    app.put('/projects/:id', updateProject);

    app.patch('/projects/like/:id', likeProject);
    
    app.delete('/projects/:id', deleteProject);

}