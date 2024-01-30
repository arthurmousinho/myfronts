import { prisma } from "../../../lib/prisma";

export async function getUserProjects(userId: string) {
    const projects = await prisma.project.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return projects;
}