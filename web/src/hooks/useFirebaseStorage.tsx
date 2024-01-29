import { deleteObject, getStorage, ref } from "firebase/storage";
import { storage } from "@/services/firebase";
import { ProjectProps, useProject } from "./useProject";

export function useFirebaseStorage() {
    
    const { getAllProjects } = useProject();

    async function deleteImage(imageUUID: string) {
        try {
            const path = `images/${imageUUID}`;
            const imgRef = ref(storage, path);
            await deleteObject(imgRef);
        } catch(error) {
            console.error("Erro ao excluir a imagem do projeto")
        }
    }

    async function deleteAllUserImages() {
        try {
          const storage = getStorage();
          const allUserProjects: ProjectProps[] = await getAllProjects();
          await Promise.all(
            allUserProjects.map(async (project) => {
                const path = `images/${project.imageUUID}`;
                const imgRef = ref(storage, path);
                await deleteObject(imgRef);
            })
          )
        } catch (error) {
          console.error("Erro ao excluir todas as imagens do usuário");
        }
    }

 
    return { deleteImage, deleteAllUserImages }

}