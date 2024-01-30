import { prisma } from "../../../lib/prisma";
import { GithubUser } from "./getGithubUserByCode.service";

export async function createUserByGithubUser(githubUser: GithubUser) {

    let user = await prisma.user.findUnique({
        where: {
            githubId: githubUser.id,
        }
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                githubId: githubUser.id,
                username: githubUser.login,
                avatarURL: githubUser.avatar_url,
                bio: githubUser.bio,
                name: githubUser.name,
                githubURL: githubUser.html_url,
                linkedinURL: "",
            }
        })
    };

    return user;

}