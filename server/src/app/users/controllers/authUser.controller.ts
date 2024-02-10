import { FastifyRequest } from "fastify";
import { z } from "zod";
import { userService } from "../users.service";
import { GithubUser } from "../interfaces/GithubUser.interface";

export async function authUserController(request: FastifyRequest,) {

  const bodySchema = z.object({
    code: z.string()
  });

  const { code } = bodySchema.parse(request.body);

  const { generateUserToken, createUserByGithubUser, getGithubUserByCode } = userService();

  const githubUser: GithubUser = await getGithubUserByCode(code);

  const user = await createUserByGithubUser(githubUser);

  const token = generateUserToken(user);
  
  return { token };

}