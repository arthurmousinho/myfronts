import { storage } from "../../lib/firebase";

export async function getPresignedBucketUrl(imageUUID: string) {
    const expirationTime =  Date.now() + 5 * 60 * 1000 // 5 minutes
   
    const fileName = `images/${imageUUID}`;

    const [ url ] = await storage.bucket().file(fileName).getSignedUrl({
        action: 'write',
        expires: expirationTime,
    })

    return url;
}