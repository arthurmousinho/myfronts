import { prisma } from "../../prisma";
import { ImageType } from "../types/image.type";

export class ImageService {

    public async saveImage(image: ImageType) {
        const newImage = await prisma.image.create({
            data: image
        }) 
        return newImage;
    }

}