import { Project } from "./Project.type";

export type User = {
    id?: string;
    githubId?: number;
    username: string;
    name: string;
    bio: string;
    avatarURL: string;
    githubURL: string;
    projects?: Project[];
}