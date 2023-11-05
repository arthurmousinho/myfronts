import "dotenv/config";
import fastify from "fastify";
import { projectsRoutes } from "./routes/projects";
import { authRoutes } from "./routes/auth";

const app = fastify();

app.get('/status', (request, reply) => {
    reply.send('status ok')
})

app.register(projectsRoutes);
app.register(authRoutes);

const PORT = 3333;

app.listen({
    port: 3333
}).then(() => {
    console.log(`app runnig on http://localhost:${PORT}/`)
})