import { FastifyReply, FastifyRequest } from "fastify";
import { JwtService } from "../security/services/jwt.service";
import { GithubService } from "../services/github.service";
import { z } from "zod";
import { getRepoInfosParamsSchema } from "../security/validations/github.schema";

export class GithubController {

    private jwtService: JwtService;
    private service: GithubService;

    constructor() {
        this.jwtService = new JwtService();
        this.service = new GithubService();

        this.getUserRepos = this.getUserRepos.bind(this);
        this.getRepoInfos = this.getRepoInfos.bind(this);
    }

    public async getUserRepos(request: FastifyRequest, reply: FastifyReply){
        try {
            const tokenDecoded = await this.jwtService.decode(request);
            const username = tokenDecoded.username;
            const userRepos = await this.service.getReposByUsername(username);
            reply.status(200).send(userRepos);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

    public async getRepoInfos(request: FastifyRequest, reply: FastifyReply) {
        try {
            const tokenDecoded = await this.jwtService.decode(request);
            const username = tokenDecoded.username;
            const { repoName } = request.params as z.infer<typeof getRepoInfosParamsSchema>;

            const repoInfos = await this.service.getUserRepoInfos({ username, repoName });
            reply.status(200).send(repoInfos);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

}