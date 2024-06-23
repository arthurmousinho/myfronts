import { ProjectType } from "./Project.type";

export type User = {
    id?: string;
    githubId?: number;
    username: string;
    name: string;
    bio: string;
    avatarURL: string;
    githubURL: string;
    projects?: ProjectType[];
}

export type GithubUserType = {
    id: number;
    login: string;
    bio: string;
    name: string;
    avatar_url: string;
    html_url: string;
}