import { prisma } from "../../prisma";
import { ProjectType } from "./types/Project.type";

export class ProjectService {

    public createNewProject(project: ProjectType) {
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

}