import { prisma } from "../../prisma";
import { ProjectType } from "../types/project.type";

export class ProjectService {

    public async createNewProject(project: ProjectType) {
        prisma.project.create({
            data: {
                userId: project.userId,
                imageId: project.imageId,
                title: project.title,
                description: project.description,
                repositoryURL: project.repositoryURL,
                projectURL: project.projectURL,
                techs: project.techs,
                likes: 0,
                likedBy: []
            }
        })
    }

    public async getProjectsByUsername(username: string) {
        const projects = await prisma.project.findMany({
            where: {
                user: { username }
            },
            include: {
                image: true
            }
        });
        return projects;
    }

}