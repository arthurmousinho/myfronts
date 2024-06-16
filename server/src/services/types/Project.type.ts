export type Project = {
    id?: string;
    userId?: string;
    title: string;
    createdAt?: Date;
    imageURL: string;
    imageUUID?: string;
    description: string;
    repositoryURL: string;
    projectURL?: string;
    techs: string[];
    likes: number;
    likedBy: string[];
}