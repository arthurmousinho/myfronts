import 'dotenv/config';
import admin from 'firebase-admin';

export class StorageService {
    
    private bucket: any;

    constructor() {
        this.init();
    }

    private init() {
        admin.initializeApp({
            credential: admin.credential.cert({
              projectId: process.env.FIREBASE_PROJECT_ID!,
              clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
              privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
            }),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET!, 
        });
        this.bucket = admin.storage().bucket();
    }
    
    public async uploadImage(params: {username: string, imageFile: File,}) {
        try {
            const filePath = `images/${params.username}/${params.imageFile.name}`;
            await this.bucket.upload(filePath);
        } catch (error) {
            throw new Error('Error during image file upload')
        }
    }

}
