export type ProjectType = {
    id?: string
    title: string
    description: string
    repositoryURL: string
    projectURL: string
    techs: string[]
    likes: number
    likedBy: string[]
    createdAt?: Date

    userId: string
    imageId: string
}