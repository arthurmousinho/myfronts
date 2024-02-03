import { storage } from "../../lib/firebase";

export function storageService() {
    
    async function getSignedUrl(imageUUID: string, username: string) {
        try {
            const expirationTime =  Date.now() + 5 * 60 * 1000 // 5 minutes
            const filePath = `images/${username}/${imageUUID}`
            const [ url ] = await storage.bucket().file(filePath).getSignedUrl({
                action: 'write',
                expires: expirationTime,
            })
            return url;
        } catch (error) {
            throw new Error("Error on getting signed URL to upload")
        }
    }

    async function deleteImageByUUID(imageUUID: string, username: string) {
        try {
            const filePath = `images/${username}/${imageUUID}`
            const file = storage.bucket().file(filePath);
            await file.delete();
        } catch (error) {
            throw new Error("Error during image deletion")
        }
    }


    return {
        getSignedUrl,
        deleteImageByUUID
    }

}