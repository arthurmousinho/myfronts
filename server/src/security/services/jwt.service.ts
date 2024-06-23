import 'dotenv/config'
import { FastifyRequest } from 'fastify';
import { fastifyApp } from '../../app';
import { User } from '@prisma/client';
import { TokenType } from '../../types/token.type';

export class JwtService {

    public getSecret() {
        return process.env.JWT_SECRET || '';
    }

    public verify(request: FastifyRequest) {
        return request.jwtVerify();
    }

    public generate(user: User) {
        const token = fastifyApp.jwt.sign(
            {
              name: user.name,
              avatarURL: user.avatarURL,
              username: user.username,
              githubURL: user.githubURL,
            },
            {
              sub: user.id,
              expiresIn: '10 days',
            }
        );
        return token;
    }

    public async decode(request: FastifyRequest) {
        const decoded = await request.jwtDecode();
        return Object(decoded) as TokenType;
    }

}