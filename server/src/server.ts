import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify";
import { UserRoutes } from "./routes/user.routes";
import { ProjectRoutes } from "./routes/project.routes";
import { setSecurityRegisters } from "./security/fastify/securityRegisters";

export class Server {

    private fastifyApp: FastifyInstance;

    private PORT: number = 3333;
    private ADDRESS: string = `http://locahost:${this.PORT}/`;

    constructor() {
        this.fastifyApp = fastify();
        setSecurityRegisters(this.fastifyApp);
        this.setRoutes();
    }

    public getfastifyApp() {
        return this.fastifyApp;
    }

    private setRoutes() {
        this.fastifyApp.get('/', (request: FastifyRequest, reply: FastifyReply) => {
            reply.status(200).send({
                status: reply.statusCode,
                message: 'Hello, World!'
            });
        })

        this.fastifyApp.register(UserRoutes);
        this.fastifyApp.register(ProjectRoutes);
    }

    public run() {
        this.fastifyApp
            .listen({ port: this.PORT })
            .then(
                () => {
                    console.log(`Server is running: ${this.ADDRESS}`);
                }
            );
    }

}