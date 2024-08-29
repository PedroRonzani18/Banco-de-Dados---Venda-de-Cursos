import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UsersOracleRepository } from '../../repositories/userOracleRepository';
import { CreateUserUseCase } from './createUserUseCase';

export const createUserBodySchema = z.object({
	email: z.string(),
	login: z.string(),
	nome: z.string(),
	senha: z.string(),
	telefone: z.string()
});

export async function createController(request: FastifyRequest, reply: FastifyReply) {

	const { email, login, nome, senha, telefone } = createUserBodySchema.parse(request.body);

	const usersRepository = new UsersOracleRepository()
	const createUserUseCase = new CreateUserUseCase(usersRepository)

	const user = await createUserUseCase.execute({ email, login, nome, senha, telefone });

	if (user.isLeft())
		return reply
			.status(400)
			.send(user.value.error)

	return reply
		.status(201)
		.send(user.value.user);
}
