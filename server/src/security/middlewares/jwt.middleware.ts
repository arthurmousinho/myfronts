import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { JwtService } from "../jwt.service";

export class JwtValidationMiddleware {

    private jwtService: JwtService;

    constructor() {
        this.jwtService = new JwtService();
    }

    validateJwt() {
        return async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await this.jwtService.verify(request);
            } catch (error: any) {
                const errorMessage = "Invalid token";
                reply.status(400).send({ statusCode: error.statusCode, message: errorMessage });
            }
        }
    }

}