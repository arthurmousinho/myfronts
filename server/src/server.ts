import fastify from "fastify";
import { FastifyInstance } from "fastify";
import { UserRoutes } from "./routes/user.routes";
import { ProjectRoutes } from "./routes/project.routes";
import { GithubRoutes } from "./routes/github.routes";
import { JwtService } from "./security/services/jwt.service";

import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import helmet from "@fastify/helmet"

export class Server {

    private fastifyApp: FastifyInstance;
    private jwtService: JwtService;

    private PORT: number = 3333;
    private ADDRESS: string = `http://locahost:${this.PORT}/`;

    constructor() {
        this.fastifyApp = fastify();
        this.jwtService = new JwtService();
        
        this.fastifyApp.register(cors, {
            origin: true,
        });
        
        this.fastifyApp.register(jwt, {
            secret: this.jwtService.getSecret(),
        });
    
        this.fastifyApp.register(
            helmet, 
            { global: true }
        );

        this.setRoutes();
    }

    public getfastifyApp() {
        return this.fastifyApp;
    }

    private setRoutes() {
        this.fastifyApp.register(UserRoutes);
        this.fastifyApp.register(ProjectRoutes);
        this.fastifyApp.register(GithubRoutes);
    }

    public async run() {
        this.fastifyApp.listen({ port: this.PORT })
            .then(
                () => {
                    console.log(`Server is running: ${this.ADDRESS}`);
                }
            );
    }

}