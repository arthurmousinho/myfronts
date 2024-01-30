import { storage } from "../../../lib/firebase";

export async function deleteImageByUUID(imageUUID: string) {
    try {
        const filePath = `images/${imageUUID}`;
        const file = storage.bucket().file(filePath);
        await file.delete();
    } catch (error) {
        throw new Error("Error during image deletion")
    }
}