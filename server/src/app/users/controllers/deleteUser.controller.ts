import { FastifyReply, FastifyRequest } from "fastify";
import { TokenInfos } from "../../auth/interfaces/TokenInfos.interface"; 
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { userService } from "../users.service";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify();

    const paramsSchema = z.object({
        id: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);

    const decoded: TokenInfos = Object(await request.jwtDecode());
  
    // when userId from token is different than the userId form url
    if (id != decoded.sub) {
        reply.status(401).send(); 
    } 

    const { deleteUser } = userService();

    await deleteUser(id);
}