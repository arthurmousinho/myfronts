import fastify from "fastify";

const app = fastify();

app.get('/', () => {
    return "Hello World";
})

const PORT = 3333;

app.listen({
    port: PORT
}).then(() => {
    console.log(`app runnig on http://localhost:${PORT}/`)
})