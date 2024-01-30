import { FastifyInstance } from "fastify";
import { getUserProfile } from "./controllers/getUserProfile.controller";
import { getUserById } from "./controllers/getUserById.controller";
import { UpdateUser } from "./controllers/updateUser.controller";
import { deleteUser } from "./controllers/deleteUser.controller";

export async function usersRoutes(app: FastifyInstance) {

    app.get("/users/profile/:username", getUserProfile);

    app.get("/users/user/:id", getUserById)

    app.put('/users/user/:id', UpdateUser);

    app.delete('/users/user/:id', deleteUser);

}