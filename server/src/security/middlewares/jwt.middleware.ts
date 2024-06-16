import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { JwtService } from "../jwt.service";

export class JwtValidation {

    private jwtService: JwtService;

    constructor() {
        this.jwtService = new JwtService();
    }

    validateJwt() {
        return async (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
            try {
                await this.jwtService.verify(request);
                done();
            } catch (error: any) {
                const errorMessage = "Invalid token";
                reply.status(400).send({ statusCode: error.statusCode, message: errorMessage });
            }
        }
    }

}