export interface ProjectData {
    id?: string;
    userId: string,
    title: string,
    imageUUID: string,
    imageURL: string,
    description: string,
    repositoryURL: string,
    projectURL: string,
    techs: string[],
    likes?: number,
}