import { FastifyReply, FastifyRequest } from "fastify";
import { JwtService } from "../security/services/jwt.service";
import { GithubService } from "../services/github.service";

export class GithubController {

    private jwtService: JwtService;
    private githubService: GithubService;

    constructor() {
        this.jwtService = new JwtService();
        this.githubService = new GithubService();

        this.getUserRepos = this.getUserRepos.bind(this);
    }

    public async getUserRepos(request: FastifyRequest, reply: FastifyReply){
        try {
            const tokenDecoded = await this.jwtService.decode(request);
            const username = tokenDecoded.username;
            const userRepos = await this.githubService.getReposByUsername(username);
            reply.status(200).send(userRepos);
        } catch (error) {
            reply.status(500).send(error);
        }
    }

}