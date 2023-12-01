import { FastifyInstance } from "fastify";
import { getAllPosts } from "./getAllPosts";
import { createPost } from "./createPost";


export async function postsRoutes(app: FastifyInstance) {
    
    app.addHook('preHandler', async (request) => {
        await request.jwtVerify()
    })

    app.get('/posts', getAllPosts)

    app.post('/post', createPost)

}