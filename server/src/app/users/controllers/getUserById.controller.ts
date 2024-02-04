import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { userService } from "../users.service";

export async function getUserById(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);
    const { getUserById } = userService();
    
    const user = await getUserById(id);

    reply.status(200).send(user);
}