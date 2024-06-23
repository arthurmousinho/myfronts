import { ImageType } from "./image.type";

export type ProjectType = {
    id?: string;
    createdAt?: Date;
    image?: ImageType;

    userId: string;
    imageId: string;

    title: string;
    description: string;
    repositoryURL: string;
    projectURL: string;
    techs: string[];
    likes: number;
    likedBy: string[];
}