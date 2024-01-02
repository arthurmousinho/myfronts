import { FastifyInstance } from "fastify";
import { getUserProfile } from "../controllers/users/getUserProfile";
import { getUserById } from "../controllers/users/getUserById";
import { UpdateUser } from "../controllers/users/updateUser";
import { deleteUser } from "../controllers/users/deleteUser";

export async function usersRoutes(app: FastifyInstance) {

    app.get("/users/profile/:username", getUserProfile);

    app.get("/users/user/:id", getUserById)

    app.put('/users/user/:id', UpdateUser);

    app.delete('/users/user/:id', deleteUser);

}