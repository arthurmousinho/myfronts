import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/user.service";
import { authUserBodySchema } from "../security/validations/user.schema";
import { z } from "zod";

export class UserController {

    private service: UserService;
    
    constructor() {
        this.service =  new UserService();
    }

    public async list(request: FastifyRequest, reply: FastifyReply) {
        try {
            const users = await this.service.getAllUsers();
            reply.status(200).send(users);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    public async auth(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { code } = request.body as z.infer<typeof authUserBodySchema>;
            const authResponse = await this.service.authUser(code);
            reply.status(200).send(authResponse);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

}