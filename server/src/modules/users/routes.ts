import { FastifyInstance } from "fastify";
import { getUserProfile } from "./getUserProfile";
import { getUserById } from "./getUserById";
import { UpdateUser } from "./updateUser";
import { deleteUser } from "./deleteUser";

export async function usersRoutes(app: FastifyInstance) {

    app.get("/users/profile/:username", getUserProfile);

    app.get("/users/user/:id", getUserById)

    app.put('/users/user/:id', UpdateUser);

    app.delete('/users/user/:id', deleteUser);

}