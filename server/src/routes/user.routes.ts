import { FastifyInstance } from "fastify";
import { UserController } from "../controller/user.controller";
import { PayloadValidationMiddleware } from "../security/middlewares/payload.middleware";
import { authUserBodySchema, getUserProfileParamSchema } from "../security/validations/user.schema";
import { JwtValidationMiddleware } from "../security/middlewares/jwt.middleware";


export async function UserRoutes(app: FastifyInstance) {

    const controller = new UserController();
    const payloadValidationMiddleware = new PayloadValidationMiddleware();
    const jwtValidationMiddleware = new JwtValidationMiddleware();

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
                payloadValidationMiddleware.validateBody(authUserBodySchema)
            ] 
        },
        controller.auth
    );

    app.get(
        '/user/:username', 
        {
            preHandler: [ 
                payloadValidationMiddleware.validateParam(getUserProfileParamSchema)
            ] 
        },
        controller.getProfile
    );

}