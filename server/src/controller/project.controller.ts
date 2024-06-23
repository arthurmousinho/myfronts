import { FastifyReply, FastifyRequest } from "fastify";
import { ProjectService } from "../services/project.service";
import { z } from "zod";
import { createProjectSchema } from "../security/validations/project.schema";
import { JwtService } from "../security/services/jwt.service";

export class ProjectController {

    private service: ProjectService;
    private jwtService: JwtService;

    constructor() {
        this.service = new ProjectService();
        this.jwtService = new JwtService();
    }

    public async create(request: FastifyRequest, reply: FastifyReply) {
        const data = request.body as z.infer<typeof createProjectSchema>;

        const tokenDecoded = await this.jwtService.decode(request);
        const userId = tokenDecoded.sub;

        // TODO: UPLOAD IMAGE TO FIREBASE BUCKET
        // TODO: CREATE NEW PROJECT (this.service.createNewProject())
    }

}