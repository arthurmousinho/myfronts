import {v4 as uuidV4} from "uuid";
import { useToken } from "./useToken";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/services/firebase";

export function useFirebaseStorage() {
 
    const { decodeToken, getSavedToken } = useToken();

    function getNewImageUuid() {
        const imgUuid = uuidV4();
        return imgUuid;
    }

    async function getImageURL(imageFile: File, imageUIID: string) {
        try {
            const userInfos = decodeToken(getSavedToken());
            const uploadRef = ref(storage, `images/${userInfos?.username}/${imageUIID}`);
            const snapshot = await uploadBytes(uploadRef, imageFile)
            const url = await getDownloadURL(snapshot.ref)
            return url;
        } catch(error) {
            console.error("Erro durante o upload da imagem")
        }
    }

    async function deleteImage(imageUIID: string) {
        try {
            const userInfos = decodeToken(getSavedToken());
            const username = userInfos?.username;
            const imgRef = ref(storage, `images/${username}/${imageUIID}`);
            await deleteObject(imgRef);
        } catch(error) {
            console.error("Erro ao excluir a imagem do projeto")
        }
    }

    async function deleteAllUserImages() {
        try {
            const userInfos = decodeToken(getSavedToken());
            const username = userInfos?.username;
            const imgRef = ref(storage, `images/${username}`);
            await deleteObject(imgRef);
        } catch(error) {
            console.error("Erro ao excluir a todas as imagens do usuário")
        }
    }

    return { getImageURL, deleteImage, deleteAllUserImages, getNewImageUuid }

}