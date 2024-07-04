import 'dotenv/config';
import admin from 'firebase-admin';
import { MultipartFile } from '@fastify/multipart';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
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
    
    public async uploadImage(params: { username: string, imageFile: MultipartFile }) {
        try {
            const { username, imageFile } = params;
            
            const tmpDir = path.resolve(__dirname, '../../tmp');
            const tempFilePath = path.join(tmpDir, imageFile.filename);
            const buffer = await imageFile.toBuffer();
            
            fs.writeFileSync(tempFilePath, buffer);

            const imageUUID = uuidv4();
            const destination = `images/${username}/${imageUUID}/${imageFile.filename}`;
            const file = this.bucket.file(destination);

            await this.bucket.upload(tempFilePath, {
                destination,
                metadata: {
                    contentType: imageFile.mimetype
                }
            });

            fs.unlinkSync(tempFilePath);

            await file.makePublic();
            const url = file.publicUrl();

            return { imageUUID, url }
        } catch (error) {
            console.error(error);
            throw new Error('Error during image file upload');
        }
    }

}
