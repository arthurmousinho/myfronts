import { FastifyInstance } from "fastify";
import { refreshToken } from "./refreshToken";
import { authUser } from "./authUser";

export async function authRoutes(app: FastifyInstance) {
    
    app.post('/auth', authUser);

    app.post('/refresh-token', refreshToken)

}