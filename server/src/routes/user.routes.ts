import { FastifyInstance } from "fastify";
import { UserController } from "../controller/user.controller";
import { PayloadValidationMiddleware } from "../security/middlewares/payload.middleware";
import { authUserBodySchema, getUserProfileParamSchema } from "../security/validations/user.schema";
import { JwtValidationMiddleware } from "../security/middlewares/jwt.middleware";

const controller = new UserController();
const payloadValidationMiddleware = new PayloadValidationMiddleware();
const jwtValidationMiddleware = new JwtValidationMiddleware();

export async function UserRoutes(app: FastifyInstance) {

    app.get(
        '/user', 
        { 
            preHandler: [ 
                jwtValidationMiddleware.validateJwt()
            ] 
        },
        controller.list
    );

    app.post(
        '/user/auth', 
        {
            preHandler: [ 
                jwtValidationMiddleware.validateJwt(),
                payloadValidationMiddleware.validateBody(authUserBodySchema)
            ] 
        },
        controller.auth
    );

    app.post(
        '/user/:username', 
        {
            preHandler: [ 
                payloadValidationMiddleware.validateParam(getUserProfileParamSchema)
            ] 
        },
        controller.getProfile
    );

}