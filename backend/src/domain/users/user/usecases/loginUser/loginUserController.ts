import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { LoginUserUseCase } from './loginUserUseCase';
import { UsersOracleRepository } from '../../repositories/userOracleRepository';

export const loginUserBodySchema = z.object({
    login: z.string(),
    password: z.string(),
});

export async function loginUserController(request: FastifyRequest, reply: FastifyReply) {

    const { login, password } = loginUserBodySchema.parse(request.body);
    const loginUserUseCase = new LoginUserUseCase(new UsersOracleRepository())

    console.log("A")

    const user = await loginUserUseCase.execute({ login, password  })

    console.log("B")

    if (user.isLeft()) {
        return reply
            .status(400)
            .send(user.value)
    }

    console.log("C")

    return reply
        .status(201)
        .send(user.value.user)

    // const tokenJwt = await reply.jwtSign(
    //     {
    //         role: "USER"
    //     },
    //     {
    //         sign: {
    //             sub: user.value.user.id.toString()
    //         }
    //     });

    // const refreshToken = await reply.jwtSign(
    //     {
    //         role: "USER"
    //     },
    //     {
    //         sign: {
    //             sub: user.value.user.id.toString(),
    //             expiresIn: '7d' // usuário só perde sua autenticação se ficar 7 dias sem entrar na aplicação
    //         }
    //     });


        // .setCookie('refreshToken', refreshToken, {
        //     path: '/', // todo o backend pode ler o valor desse cookie
        //     secure: true, // cookie será encriptado por https (front nao tem acesso direto)
        //     sameSite: true, // só será acessível no mesmo site
        //     httpOnly: true // só sera acessaddo pelo backEnd
        // })
        // .send({ tokenJwt });

}