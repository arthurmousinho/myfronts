import fastify from "fastify";
import { projectsRoutes } from "./controllers/projects/routes";
import { authRoutes } from "./controllers/auth/routes";

export const app = fastify();

app.register(projectsRoutes);
app.register(authRoutes);