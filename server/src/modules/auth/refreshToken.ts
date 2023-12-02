import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { app } from "../../server";

export async function refreshToken(request: FastifyRequest, reply: FastifyReply) {

    const bodySchema = z.object({
        userId: z.string()
    })

    
    const { userId } = bodySchema.parse(request.body);
    console.log(userId)

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    console.log(user)

    if (user) {
        console.log(user)

        const token = app.jwt.sign(
            {
            name: user.name,
            avatarURL: user.avatarURL,
            username: user.username
            },
            {
            sub: user.id,
            expiresIn: '10 days',
            },
        );

        reply.send({ token })
    }
 
}