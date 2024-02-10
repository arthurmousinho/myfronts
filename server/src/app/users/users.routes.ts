import { FastifyInstance } from "fastify";
import { getUserProfileController } from "./controllers/getUserProfile.controller";
import { getUserByIdController } from "./controllers/getUserById.controller";
import { updateUserController } from "./controllers/updateUser.controller";
import { deleteUserController } from "./controllers/deleteUser.controller";
import { authUserController } from "./controllers/authUser.controller";

export async function usersRoutes(app: FastifyInstance) {

    app.get("/users/profile/:username", getUserProfileController);

    app.get("/users/user/:id", getUserByIdController);

    app.post("/users/auth", authUserController)

    app.put('/users/user/:id', updateUserController);

    app.delete('/users/user/:id', deleteUserController);

}