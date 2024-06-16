import { prisma } from "../../prisma";
import { JwtService } from "../security/jwt.service";
import { GithubService } from "./github.service";
import { GithubUserType } from "./types/GithubUser.type";

export class UserService {

    private githubService: GithubService;
    private jwtService: JwtService;

    constructor() {
        this.githubService = new GithubService();
        this.jwtService = new JwtService();
    }

    public async getAllUsers() {
        const user = await prisma.user.findMany()
        if (!user) {
            throw new Error('No users found')
        }
        return user;
    }

    private async getUserByGithubUser(githubUser: GithubUserType) {
        const user = await prisma.user.findUnique({
            where: {
                githubId: githubUser.id
            }
        });

        if (user) {
            return user;
        }

        const newUser = await prisma.user.create({
            data: {
                githubId: githubUser.id,
                username: githubUser.login,
                avatarURL: githubUser.avatar_url,
                bio: githubUser.bio,
                name: githubUser.name,
                githubURL: githubUser.html_url,
            }
        });
        return newUser;
    }

    public async authUser(code: string) {
        const githubUser = await this.githubService.getGithubUser(code);
        const user = await this.getUserByGithubUser(githubUser);
        const token = this.jwtService.generate(user);

        return { token };
    }

}