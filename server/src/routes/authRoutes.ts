import { FastifyInstance } from "fastify";
import { generateToken } from "../controllers/auth/generateToken";

export async function authRoutes(app: FastifyInstance) {
    
    app.post('/auth', generateToken);
    
}