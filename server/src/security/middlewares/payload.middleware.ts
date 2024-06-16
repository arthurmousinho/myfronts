import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { ZodSchema } from "zod";

export class PayloadValidationMiddleware {

    validateBody(schema: ZodSchema) {
        return (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
            try {
                schema.parse(request.body);
                done();
            } catch (error: any) {
                const errorMessage = "Invalid body";
                reply.status(400).send({ statusCode: error.statusCode, message: errorMessage });
            }
        }
    }

    validateParam(schema: ZodSchema) {
        return (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
            try {
                schema.parse(request.params);
                done();
            } catch (error: any) {
                const errorMessage = "Invalid param";
                reply.status(400).send({ statusCode: error.statusCode, message: errorMessage });
            }
        }
    }

}