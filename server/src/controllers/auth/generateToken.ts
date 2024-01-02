import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { app } from "../../server";
import { GithubUser, getGithubUserByCode } from "../../services/github/getGithubUserByCode";
import { createUserByGithubUser } from "../users/createUserByGithubUser";

export async function generateToken(request: FastifyRequest, reply: FastifyReply) {

  const bodySchema = z.object({
    code: z.string()
  });

  const { code } = bodySchema.parse(request.body);

  const githubUser: GithubUser = await getGithubUserByCode(code);

  console.log("(AUTH) Github User: " + githubUser.login);

  const user = await createUserByGithubUser(githubUser);

  const token = app.jwt.sign(
      {
        name: user.name,
        avatarURL: user.avatarURL,
        username: user.username
      },
      {
        sub: user.id,
        expiresIn: '10 days',
      },
  );
  
  return {
    token
  };

}