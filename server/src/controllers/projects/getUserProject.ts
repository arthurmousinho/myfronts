import { prisma } from "../../lib/prisma";

export async function getUserProject(userId: string) {
    const projects = await prisma.project.findMany({
        where: {
            userId
        }
    })
    return projects;
}