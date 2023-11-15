import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { app } from "../../server";


export async function registerUser(request: FastifyRequest, reply: FastifyReply) {

    const bodySchema = z.object({
        code: z.string()
    });

    const { code } = bodySchema.parse(request.body);

    console.log("Code: " + code)

    const accessTokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        null,
        {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                Accept: 'application/json'
            }
        },
    );

    const { access_token } = accessTokenResponse.data;

    console.log("token de acesso: " + access_token);

    const userResponse = await axios.get('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    const githubUserSchema = z.object({
        id: z.number(),
        login: z.string(),
        bio: z.string(),
        name: z.string(),
        avatar_url: z.string().url(),
        html_url: z.string().url()
    });

    const githubUser = githubUserSchema.parse(userResponse.data);

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


    const token = app.jwt.sign(
        {
          name: user.name,
          avatarURL: user.avatarURL,
          username: user.username
        },
        {
          sub: user.id,
          expiresIn: '30 days',
        },
    );
    
    return {
        token
    };

}