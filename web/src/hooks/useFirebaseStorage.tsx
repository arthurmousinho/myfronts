import {v4 as uuidV4} from "uuid";
import { useToken } from "./useToken";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/services/firebase";

export function useFirebaseStorage() {
 
    const { decodeToken, getSavedToken } = useToken();
    const username = decodeToken(getSavedToken())?.username;

    function getNewUIID() {
        return uuidV4();
    }

    async function saveImage(imageFile: File, projectTitle: string, imageUUID: string) {
        try {
            const path = `images/${username}/${projectTitle}/${imageUUID}`;
            const uploadRef = ref(storage, path);
            const snapshot = await uploadBytes(uploadRef, imageFile);
            return await getDownloadURL(snapshot.ref);
        } catch(error) {
            alert("Erro ao salvar imagem no firebase");
            console.error(error);
        }
    }

    async function deleteImage(imageUUID: string, projectTitle: string) {
        try {
            const title = projectTitle.toLowerCase().replace(/\s/g, '');
            const path = `images/${username}/${title}/${imageUUID}`;
            const imgRef = ref(storage, path);
            await deleteObject(imgRef);
        } catch(error) {
            console.error("Erro ao excluir a imagem do projeto")
        }
    }

    async function deleteAllUserImages() {
        try {
            const path = `images/${username}`
            const imgRef = ref(storage, path);
            await deleteObject(imgRef);
        } catch(error) {
            console.error("Erro ao excluir a todas as imagens do usuário")
        }
    }

    return { deleteImage, deleteAllUserImages, saveImage, getNewUIID }

}