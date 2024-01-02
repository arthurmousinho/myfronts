import "dotenv/config";

import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { projectsRoutes } from "./routes/projectsRoutes";
import { authRoutes } from "./routes/authRoutes";
import { usersRoutes } from "./routes/usersRoutes";

export const app = fastify();

app.register(cors, {
    origin: true,
})

app.register(jwt, {
    secret: 'sfojvndsujadsn',
})

app.register(projectsRoutes);
app.register(authRoutes);
app.register(usersRoutes);

const PORT = process.env.PORT ?? 3333;

app.listen({
    port: 3333
}).then(() => {
    console.log(`app runnig on http://localhost:${PORT}/`)
})

export interface tokenInfos {
    name: string;
    avatarURL: string;
    username: string;
    sub: string;
    iat: number;
    exp: number;
}