import { FastifyInstance } from "fastify";

import { getUploadUrlController } from "./controllers/getUploadUrl.controller";
import { deleteImageController } from "./controllers/deleteImage.controller";
import { deleteAllUserImageController } from "./controllers/deleteAllUserImages.controller";

export async function storageRoutes(app: FastifyInstance) {
    
    app.post('/storage/get-upload-url', getUploadUrlController);

    app.delete('/storage/delete/:imageUUID', deleteImageController);

    app.delete('/storage/deleteAll/:userId', deleteAllUserImageController)

}