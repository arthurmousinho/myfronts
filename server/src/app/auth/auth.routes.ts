import { FastifyInstance } from "fastify";
import { generateToken } from "./controllers/generateToken.controller";

export async function authRoutes(app: FastifyInstance) {
    
    app.post('/auth', generateToken);

}