import { FastifyInstance } from "fastify";
import { JwtValidationMiddleware } from "../security/middlewares/jwt.middleware";
import { GithubController } from "../controller/github.controller";
import { PayloadValidationMiddleware } from "../security/middlewares/payload.middleware";
import { getRepoInfosParamsSchema } from "../security/validations/github.schema";

export async function GithubRoutes(app: FastifyInstance) {
    
    const jwtValidationMiddleware = new JwtValidationMiddleware();
    const payloadValidationMiddleware = new PayloadValidationMiddleware();
    const controller = new GithubController();

    app.get(
        '/github/repos',
        { 
            preHandler: [ 
                jwtValidationMiddleware.validateJwt()
            ] 
        },
        controller.getUserRepos
    );

    app.get(
        '/github/repos/:repoName',
        { 
            preHandler: [ 
                jwtValidationMiddleware.validateJwt(),
                payloadValidationMiddleware.validateParam(getRepoInfosParamsSchema)
            ] 
        },
        controller.getRepoInfos
    );

}