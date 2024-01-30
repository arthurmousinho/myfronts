import { FastifyInstance } from "fastify";
import { getUploadUrl } from "../controllers/storage/getUploadUrl";
import { deleteImage } from "../controllers/storage/deleteImage";
import { deleteAllUserImage } from "../controllers/storage/deleteAllUserImages";

export async function storageRoutes(app: FastifyInstance) {
    
    app.post('/storage/get-upload-url', getUploadUrl);

    app.delete('/storage/delete/:imageUUID', deleteImage);

    app.delete('/storage/deleteAll/:userId', deleteAllUserImage)

}