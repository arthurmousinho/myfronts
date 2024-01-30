import { FastifyInstance } from "fastify";
import { getUploadUrl } from "../controllers/storage/getUploadUrl";
import { deleteImage } from "../controllers/storage/deleteImage";

export async function storageRoutes(app: FastifyInstance) {
    
    app.post('/storage/get-upload-url', getUploadUrl);

    app.delete('/storage/delete', deleteImage)

}