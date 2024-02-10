import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { userService } from "../users.service";
import { TokenInfos } from "../interfaces/TokenInfos.interface";

export async function deleteUserController(request: FastifyRequest, reply: FastifyReply) {

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