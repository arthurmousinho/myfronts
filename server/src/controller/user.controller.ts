import { FastifyRequest, FastifyReply } from "fastify";
import { authUserBodySchema, getUserProfileParamSchema } from "../security/validations/user.schema";
import { z } from "zod";
import { UserService } from "../services/user.service";

export class UserController {

    private service: UserService;

    constructor() {
        this.service = new UserService();
        
        this.auth = this.auth.bind(this);
        this.list = this.list.bind(this);
        this.getProfile = this.getProfile.bind(this);
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

    public async getProfile(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { username } = request.params as z.infer<typeof getUserProfileParamSchema>;
            const userProfile = await this.service.getUserByUsername(username);
            reply.status(200).send(userProfile);
        } catch (error) {
            reply.status(404).send(error);
        }
    }

}