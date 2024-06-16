import { FastifyInstance } from "fastify";
import { UserController } from "../controller/user.controller";
import { PayloadValidationMiddleware } from "../security/middlewares/payload.middleware";
import { authUserBodySchema } from "../security/validations/user.schema";

const controller = new UserController();
const validationMiddleware = new PayloadValidationMiddleware();

export async function UserRoutes(app: FastifyInstance) {

    app.get(
        '/user', 
        { 
            preHandler: [ 
                validationMiddleware.validateBody(authUserBodySchema) 
            ] 
        },
        controller.list
    );

    app.post('/user/auth', controller.auth);

}