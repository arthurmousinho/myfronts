import { FastifyReply, FastifyRequest } from "fastify";
import { ProjectService } from "../services/project.service";
import { z } from "zod";
import { createProjectSchema } from "../security/validations/project.schema";
import { TokenType } from "../services/types/token.type";

export class ProjectController {

    private service: ProjectService;

    constructor() {
        this.service = new ProjectService();
    }

    public async create(request: FastifyRequest, reply: FastifyReply) {
        const data = request.body as z.infer<typeof createProjectSchema>;

        const tokenDecoded: TokenType = Object(await request.jwtDecode());
        const userId = tokenDecoded.sub;

        // TODO: UPLOAD IMAGE TO FIREBASE BUCKET
        // TODO: CREATE NEW PROJECT (this.service.createNewProject())
    }

}