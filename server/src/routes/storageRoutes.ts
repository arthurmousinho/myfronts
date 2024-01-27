import { FastifyInstance } from "fastify";
import { getPresignedUrl } from "../controllers/storage/getPresignedUrl";

export async function storageRoutes(app: FastifyInstance) {
    
    app.post('/get-presigned-url', getPresignedUrl);

}