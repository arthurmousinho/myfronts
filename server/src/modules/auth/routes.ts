import { FastifyInstance } from "fastify";
import { generateToken } from "./generateToken";

export async function authRoutes(app: FastifyInstance) {
    
    app.post('/auth', generateToken);
    
}