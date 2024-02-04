import { prisma } from "../../lib/prisma";
import { projectService } from "../projects/projects.service";
import { UserData } from "./interfaces/UserData";

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


    return {
        getUserProfile,
        getUserById,
        deleteUser,
        updateUser
    }

}