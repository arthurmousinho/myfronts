import axios from "axios";
import { useToken } from "./useToken";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL;

interface Project {
    id: string;
    title: string;
    createdAt: string;
    imageURL: string;
    description: string;
    repositoryURL: string;
    projectURL: string;
    techs: string[];
}

export interface User {
    id: number;
    username: string;
    bio: string;
    name: string;
    avatarURL: string;
    githubURL: string;
    linkedinURL: string;
    projects: Project[];
}

export interface EditUserData {
    name: string | undefined;
    username: string | undefined;
    githubURL: string | undefined;
    linkedinURL: string | undefined;
    bio: string | undefined;
}

export function useUsers() {

    const { getSavedToken, decodeToken } = useToken();
    const navigate = useNavigate();

    async function getUserInfos(username: string) {
        try {
            const response = await axios.get(`${API}/users/profile/${username}`);
            return response.data;
        } catch(error) {
            navigate('/');
        }
    }

    async function getUserInfosById(userId: string) {
        try {
            const response = await axios.get(`${API}/users/user/${userId}`);
            return response.data;
        } catch(error) {
            navigate('/');
        }
    }

    async function editUser(editUserData: EditUserData) {
        try {
            const userId = decodeToken(getSavedToken()).sub;
            const response = await axios.put(`${API}/users/user/${userId}`, 
                editUserData,
                {
                    headers: {
                        'Authorization': `Bearer ${getSavedToken()}`,
                        'Content-Type': 'application/json'
                    }
                } 
            )
            return response.data;
        } catch(error) {
            alert("Erro ao editar usuário")
        }
    }


    return { getUserInfos, getUserInfosById, editUser }

}
