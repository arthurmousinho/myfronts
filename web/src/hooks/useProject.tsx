import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToken } from "./useToken";
import { useToast } from "@/components/ui/use-toast";
import { useStorate } from "./useStorage";

const API = import.meta.env.VITE_API_BASE_URL;

export interface ProjectProps {
    id: string;
    userId: string;
    title: string;
    createdAt: string;
    imageURL: string;
    description: string;
    repositoryURL: string;
    projectURL: string;
    techs: string[];
    imageUUID: string;
    likes: number;
    likedBy: string[];
}

export interface newProjectData {
    title: string;
    imageURL: string;     
    description: string;  
    repositoryURL: string;
    projectURL: string;  
    techs: string[];
    imageUUID: string;
}

export function useProject() {

    const { getSavedToken } = useToken();
    const { toast } = useToast();

    const token = getSavedToken();
    const navigate = useNavigate();

    async function saveProject(data: newProjectData) {
        try {
            await axios.post(
                `${API}/projects`, 
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }    
            );
            toast({
                description: `Projeto ${data.title} salvo com sucesso!`,        
            })
            navigate('/projects', { state: false });
        } catch (error) {
            toast({
                variant: "destructive",
                description: `Erro ao salvar o projeto ${data.title}, tente novamente.`,        
            })
        }
    }

    async function getProjectById(id: string) {
        try {
            const response = await axios.get(`${API}/projects/${id}`);
            return response.data;
        } catch(error) {
            navigate('/')
        }
    }

    async function getAllProjects() {
        try {
            const response = await axios.get(
                `${API}/projects`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/'
                    }
                }    
            );
            return response.data;
        } catch (error) {   
            navigate('/')
        }
    }

    async function deleteProject(id: string) {
        try {
            await axios.delete(
                `${API}/projects/${id}`, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            toast({
                description: `Projeto excluído com sucesso!`,        
            })
        } catch (error) {
            alert("Erro ao deletar o projeto");
        }
    }

    async function editProject(id: string, data: newProjectData) {
        try {
            await axios.put(
                `${API}/projects/${id}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            )
            toast({
                description: `Projeto editado com sucesso!`,        
            })
        } catch (error) {
            console.error("Erro ao atualizar o projeto")
        }
    }

    async function likeProject(id: string) {
        try {
            await axios.patch(
                `${API}/projects/like/${id}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            )
        } catch (error) {
            console.error("Erro durante o LIKE no projeto");
        }
    }

    async function getTrendingProjects() {
        try {
            const response = await axios.get(
                `${API}/projects/trending`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            )
            const trendingProjects = response.data;
            return trendingProjects;
        } catch (error) {
            console.error("Erro ao buscar os projetos em alta");
        }
    }

    return { 
        getProjectById, 
        saveProject, 
        deleteProject, 
        getAllProjects, 
        editProject, 
        likeProject,
        getTrendingProjects
    }

}