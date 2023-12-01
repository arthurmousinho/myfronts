import { FastifyInstance } from "fastify";
import { getUserProfile } from "./getUserProfile";
import { getUserById } from "./getUserById";

export async function usersRoutes(app: FastifyInstance) {

    app.get("/users/profile/:username", getUserProfile);

    app.get("/users/user/:id", getUserById)

}