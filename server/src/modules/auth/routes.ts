import { FastifyInstance } from "fastify";
import { registerUser } from "./registerUser";
import { refreshToken } from "./refreshToken";

export async function authRoutes(app: FastifyInstance) {
    
    app.post('/register', registerUser);

    app.post('/refresh-token', refreshToken)

}