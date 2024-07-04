import { FastifyReply, FastifyRequest } from "fastify";
import { ProjectService } from "../services/project.service";
import { z } from "zod";
import { createProjectSchema } from "../security/validations/project.schema";
import { JwtService } from "../security/services/jwt.service";
import { StorageService } from "../services/storage.service";
import { ImageService } from "../services/image.service";

export class ProjectController {

    private service: ProjectService;
    private jwtService: JwtService;
    private storageService: StorageService;
    private imageService: ImageService;

    constructor() {
        this.service = new ProjectService();
        this.jwtService = new JwtService();
        this.storageService = new StorageService();
        this.imageService = new ImageService();

        this.create = this.create.bind(this);
        this.getUserProjects = this.getUserProjects.bind(this);
    }

    public async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            const data = request.body as z.infer<typeof createProjectSchema>;
    
            const tokenDecoded = await this.jwtService.decode(request);
            const username = tokenDecoded.username;
            const userId = tokenDecoded.sub;
    
            const newImageData = await this.storageService.uploadImage({ 
                imageFile: data.image, 
                username 
            });
            const newImage = await this.imageService.saveImage({
                id: newImageData.imageUUID,
                url: newImageData.url
            });

            await this.service.createNewProject({
                userId,
                imageId: newImage.id,
                title: data.title,
                description: data.description,
                repositoryURL: data.repositoryURL,
                projectURL: data.projectURL || '',
                techs: data.techs,
                likes: 0,
                likedBy: []
            });

            reply.status(200).send();
        } catch (error) {
            console.log(error)
            reply.status(500).send('Error during project saving');
        }
    }

    public async getUserProjects(request: FastifyRequest, reply: FastifyReply) {
        const tokenDecoded = await this.jwtService.decode(request);
        const username = tokenDecoded.username;
        const projects = await this.service.getProjectsByUsername(username);
        reply.status(200).send(projects);
    }

}