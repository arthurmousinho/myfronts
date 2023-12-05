import { FastifyReply, FastifyRequest } from "fastify";
import { tokenInfos } from "../../server";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const paramsSchema = z.object({
        id: z.string(),
    })

    const { id } = paramsSchema.parse(request.params);

    const decoded: tokenInfos = Object(await request.jwtDecode());
  
    // when userId from token is different than the userId form url
    if (id != decoded.sub) {
        reply.status(401).send(); 
    } 

    await prisma.user.delete({
        where: {
            id
        }
    });

    await prisma.project.deleteMany({
        where: {
            userId: id
        }
    })

}