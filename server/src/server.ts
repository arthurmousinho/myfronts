import "dotenv/config";

import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { projectsRoutes } from "./app/projects/projects.routes";
import { usersRoutes } from "./app/users/users.routes";
import { storageRoutes } from "./app/storage/storage.routes";

export const app = fastify();

app.register(cors, {
    origin: 'http://localhost:5173',
})

const JWT_SECRET = process.env.JWT_SECRET;

JWT_SECRET && app.register(jwt, {
    secret: JWT_SECRET,
})

app.register(projectsRoutes);
app.register(usersRoutes);
app.register(storageRoutes);

const PORT = process.env.PORT ?? 3333;

app.listen({
    port: 3333
}).then(() => {
    console.log(`app runnig on http://localhost:${PORT}/`)
})