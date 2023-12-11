import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToken } from "./useToken";

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

    const navigate = useNavigate();

    async function saveProject(data: newProjectData) {
        try {
            const token = getSavedToken();
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
        } catch (error) {
            alert("Erro ao salvar o projeto");
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
            const token = getSavedToken();
            const response = await axios.get(
                `${API}/projects`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
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
            const token = getSavedToken();
            await axios.delete(
                `${API}/projects/${id}`, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
        } catch (error) {
            alert("Erro ao deletar o projeto");
        }
    }

    return { getProjectById, saveProject, deleteProject, getAllProjects }

}