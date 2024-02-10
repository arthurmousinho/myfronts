import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { userService } from "../users.service";

export async function getUserProfileController(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        username: z.string(),
    });

    const { username } = paramsSchema.parse(request.params);
    const { getUserProfile } = userService();

    const userProfile = await getUserProfile(username);

    reply.status(200).send(userProfile);
}