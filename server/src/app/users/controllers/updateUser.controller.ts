import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { TokenInfos } from "../../auth/interfaces/TokenInfos.interface";
import { userService } from "../users.service";

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const paramsSchema = z.object({
        id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params);

    const decoded: TokenInfos = Object(await request.jwtDecode());
  
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
    const { updateUser } = userService();

    const updatedUser = await updateUser({
        id,
        username: body.username,
        bio: body.bio,
        linkedinURL: body.linkedinURL,
        name: body.name,
    })

    reply.status(200).send(updatedUser);
}