import { FastifyInstance } from "fastify";
import { JwtValidationMiddleware } from "../security/middlewares/jwt.middleware";
import { ProjectController } from "../controller/project.controller";
import { PayloadValidationMiddleware } from "../security/middlewares/payload.middleware";
import { createProjectSchema } from "../security/validations/project.schema";

export async function ProjectRoutes(app: FastifyInstance) {

    const controller = new ProjectController();
    const jwtValidationMiddleware = new JwtValidationMiddleware();
    const payloadValidationMiddleware = new PayloadValidationMiddleware();

    app.post(
        '/project',
        { 
            preHandler: [ 
                jwtValidationMiddleware.validateJwt(),
                payloadValidationMiddleware.validateBody(createProjectSchema)
            ] 
        },
        controller.create
    )

}