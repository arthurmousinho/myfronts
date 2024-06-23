import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { ZodSchema } from "zod";

export class PayloadValidationMiddleware {

    private validatePayload(schema: ZodSchema, key: 'body' | 'params') {
        return (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
            try {
                if (key == 'body') {
                    schema.parse(request.body);
                } else {
                    schema.parse(request.params);
                }
                done();
            } catch (error: any) {
                const errorMessage = `Invalid ${key}`;
                reply.status(400).send({ statusCode: error.statusCode, message: errorMessage });
            }
        }
    }

    validateBody(schema: ZodSchema) {
        return this.validatePayload(schema, 'body');
    }

    validateParam(schema: ZodSchema) {
        return this.validatePayload(schema, 'params');
    }

}