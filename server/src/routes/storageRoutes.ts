import { FastifyInstance } from "fastify";
import { getUploadUrl } from "../controllers/storage/getUploadUrl";

export async function storageRoutes(app: FastifyInstance) {
    
    app.post('/storage/get-upload-url', getUploadUrl);

}