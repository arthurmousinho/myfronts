import { FastifyInstance } from "fastify";
import { getAllProjectsController } from "./controllers/getAllProjects.controller";
import { getProjectByIdController } from "./controllers/getProjectById.controller";
import { getTrendingProjectsController } from "./controllers/getTrendingProjects.controller";
import { createProjectController } from "./controllers/createProject.controller";
import { updateProjectController } from "./controllers/updateProject.controller";
import { likeProjectController } from "./controllers/likeProject.controller";
import { deleteProjectController } from "./controllers/deleteProject.controller";

export async function projectsRoutes(app: FastifyInstance) {

    app.get('/projects', getAllProjectsController);

    app.get('/projects/:id', getProjectByIdController);

    app.get('/projects/trending', getTrendingProjectsController);

    app.post('/projects', createProjectController);

    app.put('/projects/:id', updateProjectController);

    app.patch('/projects/like/:id', likeProjectController);
    
    app.delete('/projects/:id', deleteProjectController);

}