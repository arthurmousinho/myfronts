import { FastifyInstance } from "fastify";

import { getUploadUrl } from "./controllers/getUploadUrl.controller";
import { deleteImage } from "./controllers/deleteImage.controller";
import { deleteAllUserImage } from "./controllers/deleteAllUserImages.controller";

export async function storageRoutes(app: FastifyInstance) {
    
    app.post('/storage/get-upload-url', getUploadUrl);

    app.delete('/storage/delete/:imageUUID', deleteImage);

    app.delete('/storage/deleteAll/:userId', deleteAllUserImage)

}