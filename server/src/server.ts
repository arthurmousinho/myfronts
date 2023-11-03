import fastify from "fastify";
import { projectsRoutes } from "./routes/projects";

const app = fastify();

app.get('/status', (request, reply) => {
    reply.send('status ok')
})

app.register(projectsRoutes);

const PORT = 4000;

app.listen({
    port: 4000
}).then(() => {
    console.log(`app runnig on http://localhost:${PORT}/`)
})