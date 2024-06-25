import { FastifyInstance } from "fastify";
import { JwtValidationMiddleware } from "../security/middlewares/jwt.middleware";
import { GithubController } from "../controller/github.controller";

export async function GithubRoutes(app: FastifyInstance) {
    
    const jwtValidationMiddleware = new JwtValidationMiddleware();
    const controller = new GithubController();

    app.get(
        '/github/repos',
        { 
            preHandler: [ 
                jwtValidationMiddleware.validateJwt(),
            ] 
        },
        controller.getUserRepos
    );

}