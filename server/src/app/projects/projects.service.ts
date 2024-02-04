import { prisma } from "../../lib/prisma";
import { ProjectData } from "./interfaces/ProjectData";

export function projectService() {

    async function createProject(newProject: ProjectData) {
        await prisma.project.create({
            data: {
                userId: newProject.userId,
                title: newProject.title,
                imageURL: newProject.imageURL,     
                description: newProject.description,  
                repositoryURL: newProject.repositoryURL,
                projectURL: newProject.projectURL,  
                techs: newProject.techs,
                imageUUID: newProject.imageUUID,
                likes: 0
            }
        });
    }

    async function deleteProject(projectId: string, userId: string) {
        await prisma.project.findUniqueOrThrow({
            where: {
                id: projectId,
                userId: userId,
            }
        });
    
        await prisma.project.delete({
            where: {
                id: projectId
            }
        })
    }


    async function deleteAllUserProjects(userId: string) {
        await prisma.project.findFirstOrThrow({
            where: {
                userId
            }
        })

        await prisma.project.deleteMany({
            where: {
                userId,
            }
        });
    }


    async function getAllUserProjects(userId: string) {
        const userProjects =  await prisma.project.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        return userProjects;
    }


    async function getProjectById(projectId: string) {
        const project = await prisma.project.findUniqueOrThrow({
            where: {
                id: projectId,
            }
        });
        return project;
    }


    async function getTrendingProjects() {
        const trendingProjects = await prisma.project.findMany({
            where: {
                likes: {
                    gte: 1
                }
            },
            orderBy: {
                likes: "desc"
            }
        })
        return trendingProjects;
    }


    async function likeProject(projectId: string, userId: string) {
        await prisma.user.findUniqueOrThrow({
            where: {
                id: userId
            }
        })
    
        const project = await prisma.project.findUniqueOrThrow({
            where: {
                id: projectId
            }
        });
    
        const currentLikesAmount = project.likes;
    
        await prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                likes: currentLikesAmount + 1,
                likedBy: [...project.likedBy, userId],
            }
        })
    }
    
    async function updateProject(project: ProjectData, userId: string) {
        await prisma.project.findUniqueOrThrow({
            where: {
                id: project.id,
                userId,
            }
        });

        await prisma.project.update({
            where: {
                id: project.id,
            },
            data: {
                title: project.title,
                imageURL: project.imageURL,
                description: project.description,
                repositoryURL: project.repositoryURL,
                projectURL: project.projectURL,
                techs: project.techs,
                imageUUID: project.imageUUID
            }
        });
    }


    return {
        createProject,
        deleteProject,
        getAllUserProjects,
        getProjectById,
        getTrendingProjects,
        likeProject,
        updateProject,
        deleteAllUserProjects
    }

}