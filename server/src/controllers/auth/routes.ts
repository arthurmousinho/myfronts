import { FastifyInstance } from "fastify";
import { registerUser } from "./registerUser";

export async function authRoutes(app: FastifyInstance) {
    
    app.post('/register', registerUser);

}