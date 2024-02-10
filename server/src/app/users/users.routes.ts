import { FastifyInstance } from "fastify";
import { getUserProfile } from "./controllers/getUserProfile.controller";
import { getUserById } from "./controllers/getUserById.controller";
import { updateUser } from "./controllers/updateUser.controller";
import { deleteUser } from "./controllers/deleteUser.controller";
import { authUserController } from "./controllers/authUser.controller";

export async function usersRoutes(app: FastifyInstance) {

    app.get("/users/profile/:username", getUserProfile);

    app.get("/users/user/:id", getUserById);

    app.post("/users/auth", authUserController)

    app.put('/users/user/:id', updateUser);

    app.delete('/users/user/:id', deleteUser);

}