import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

async function getGithubAccessToken(code: string) {
    const accessTokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        null /* body */,
        {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code: code,
            },
            headers: {
                Accept: 'application/json'
            }
        },
    );

    const { access_token } = accessTokenResponse.data;
    return access_token;
}

async function getGithubUser(code: string) {

    const accessToken = getGithubAccessToken(code);

    const response = await axios.get('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const githubUserSchema = z.object({
        id: z.number(),
        bio: z.string(),
        name: z.string(),
        avatar_url: z.string().url(),
        html_url: z.string().url()
    });

    const githubUser = githubUserSchema.parse(response.data);

    return githubUser;
}

async function userAlreadyExists(githubId: number) {
    let user = await prisma.user.findFirstOrThrow({
        where: {
            githubId
        }
    })

    if (!user) {
        return false;
    }

    return true;
}

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {

    const bodySchema = z.object({
        code: z.string()
    });

    const { code } = bodySchema.parse(request.body);

    const githubUser = await getGithubUser(code);

    if (await userAlreadyExists(githubUser.id) === false) {
        await prisma.user.create({
            data: {
                githubId: githubUser.id,
                avatarURL: githubUser.avatar_url,
                bio: githubUser.bio,
                name: githubUser.name,
                githubURL: githubUser.html_url,
                linkedinURL: ""
            }
        })

        reply.status(201).send(githubUser);
    }

}