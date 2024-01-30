import axios from "axios";
import { useToken } from "./useToken";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/services/firebase";
import {v4 as uuidV4} from "uuid";

const API = import.meta.env.VITE_API_BASE_URL;

export function useStorage() {

    const { getSavedToken } = useToken();

    async function getUploadURL(imageUUID: string) {
        const token = getSavedToken();
        try {
            const response = await axios.post(
                `${API}/storage/get-upload-url`,
                { imageUUID },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch(error) {
            console.error("Erro ao buscar a URL para upload")
        }
    }

    function getNewUIID() {
        return uuidV4();
    }

    async function uploadImage(imageFile: File, imageUUID: string) {
        try {
            const uploadURLResponse = await getUploadURL(imageUUID); 
            const presignedUrl = uploadURLResponse.url;

            const uploadRef = ref(storage, presignedUrl); 
            const uploadTask = uploadBytesResumable(uploadRef, imageFile);

            const snapshot = await uploadTask;
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
        } catch(error) {
            alert("Erro ao salvar imagem no firebase");
            console.error(error);
        }
    }

    async function deleteImage(imageUUID: string) {
        const token = getSavedToken();

        try {
            await axios.delete(
                `${API}/storage/delete/${imageUUID}`, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
        } catch (error) {
            console.error("Erro durante ao deletar a imagem")
        }
    }

    return { 
        uploadImage,
        getNewUIID,
        deleteImage
    }

}