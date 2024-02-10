import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { app } from "../../server";
import { projectService } from "../projects/projects.service";
import { UserData } from "./interfaces/UserData.interface";
import axios from "axios";
import { z } from "zod";
import { GithubUser } from "./interfaces/GithubUser.interface";

export function userService() {

    async function getUserProfile(username: string) {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                username: username,
            }
        });
    
        const { getAllUserProjects } = projectService();
    
        const projects = await getAllUserProjects(user.id);
        const data = {
            ...user,
            projects: projects
        };

        return data;
    }

    
    async function getUserById(userId: string) {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            }
        });
        return user;
    }

    
    async function deleteUser(userId: string) {
        const { deleteAllUserProjects } = projectService();

        await deleteAllUserProjects(userId);

        await prisma.user.delete({
            where: {
                id: userId
            }
        })
    }


    async function updateUser(user: UserData) {
        await prisma.user.findUniqueOrThrow({
            where: {
                id: user.id
            }
        });

        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name: user.name,
                username: user.username,
                linkedinURL: user.linkedinURL,
                bio: user.bio, 
            }
        });

        return updatedUser;
    }

    async function createUserByGithubUser(githubUser: GithubUser) {

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


    async function generateUserToken(user: User) {
        const token = app.jwt.sign(
            {
              name: user.name,
              avatarURL: user.avatarURL,
              username: user.username,
              githubURL: user.githubURL,
            },
            {
              sub: user.id,
              expiresIn: '10 days',
            },
        );
        return token;
    }

    async function getGithubUserByCode(code: string) {

        const response = await axios.post(
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
    
        const { access_token } = response.data;
    
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
    
        const githubUser: GithubUser = githubUserSchema.parse(userResponse.data);
    
        return githubUser;
    }


    return {
        getUserProfile,
        getUserById,
        deleteUser,
        updateUser,
        generateUserToken,
        createUserByGithubUser,
        getGithubUserByCode
    }

}