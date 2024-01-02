import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { tokenInfos } from "../../server";

export async function UpdateUser(request: FastifyRequest, reply: FastifyReply) {

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

    const bodySchema = z.object({
        name: z.string(),
        username: z.string(),
        bio: z.string(),
        linkedinURL: z.string(),
    })

    const body = bodySchema.parse(request.body);

    const userFound = await prisma.user.findUniqueOrThrow({
        where: {
            id: decoded.sub,
            username: decoded.username,
            name: decoded.name,
        }
    });

    if (!userFound) {
        reply.status(404).send();
    } 

    const updatedUser = await prisma.user.update({
        where: {
            id
        },
        data: {
            name: body.name,
            username: body.username,
            linkedinURL: body.linkedinURL,
            bio: body.bio, 
        }
    });

    reply.status(200).send(updatedUser);
}