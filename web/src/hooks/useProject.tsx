import axios from "axios";
import { useNavigate } from "react-router-dom";

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
}


export interface newProjectData {
    title: string;
    imageURL: string;     
    description: string;  
    repositoryURL: string;
    projectURL: string;  
    techs: string[];
}

export function useProject() {

    const navigate = useNavigate();

    async function saveProject(data: newProjectData, token: string) {
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
    }

    async function getProjectById(id: string) {
        try {
            const response = await axios.get(`${API}/projects/${id}`);
            return response.data;
        } catch(error) {
            navigate('/')
        }
    }

    return { getProjectById, saveProject }

}