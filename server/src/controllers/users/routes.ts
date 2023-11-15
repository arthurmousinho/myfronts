import { FastifyInstance } from "fastify";
import { getUserProfile } from "./getUserProfile";

export async function usersRoutes(app: FastifyInstance) {

    app.get("/users/:username", getUserProfile);

}