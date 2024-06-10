import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { FastifyInstance } from "fastify";
import { JwtService } from "./security/jwt.service";

export class Server {

    private jwtService: JwtService;
    private fastifyApp: FastifyInstance;

    private PORT: number = 3333;
    private ADDRESS: string = `http://locahost:${this.PORT}/`

    constructor() {
        this.jwtService = new JwtService();

        this.fastifyApp = fastify();
        
        this.setRegisters();
        this.setRoutes();
    }

    private setRegisters() {
        this.fastifyApp.register(cors, {
            origin: true,
        });

        this.fastifyApp.register(jwt, {
            secret: this.jwtService.getSecret(),
        });
    }

    private setRoutes() {
        this.fastifyApp.get('/', (request: FastifyRequest, reply: FastifyReply) => {
            reply.status(200).send({
                status: reply.statusCode,
                message: 'Hello, World!'
            });
        })
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