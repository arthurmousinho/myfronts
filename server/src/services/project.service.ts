import { prisma } from "../../prisma";
import { ProjectType } from "../types/project.type";

export class ProjectService {

    public async createNewProject(projectData: ProjectType) {
        await prisma.project.create({
            data: projectData
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