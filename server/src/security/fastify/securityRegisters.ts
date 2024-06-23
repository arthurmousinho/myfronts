import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import helmet from "@fastify/helmet"

import { JwtService } from "../services/jwt.service";

export function setSecurityRegisters(app: FastifyInstance) {
    const jwtService = new JwtService;

    app.register(cors, {
        origin: true,
    });

    app.register(jwt, {
        secret: jwtService.getSecret(),
    });

    app.register(
        helmet, 
        { global: true }
    );
}