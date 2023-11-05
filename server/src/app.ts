import fastify from "fastify";
import { projectsRoutes } from "./routes/projects";
import { authRoutes } from "./routes/auth";

export const app = fastify();

app.register(projectsRoutes);
app.register(authRoutes);