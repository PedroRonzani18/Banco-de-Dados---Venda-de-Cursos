import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UsersOracleRepository } from '../../repositories/userOracleRepository';
import { UpdateUserUseCase } from './updateUserUseCase';

export const updateUserParamsSchema = z.object({
	id: z.string(),
});

export const updateUserBodySchema = z.object({
	email: z.string().optional(),
	login: z.string().optional(),
	nome: z.string().optional(),
	senha: z.string().optional(),
	telefone: z.string().optional(),
});

export async function updateUserController(request: FastifyRequest, reply: FastifyReply) {

	const { email, login, nome, senha, telefone } = updateUserBodySchema.parse(request.body);
	const { id } = updateUserParamsSchema.parse(request.params);

	const usersRepository = new UsersOracleRepository()
	const updateUserUseCase = new UpdateUserUseCase(usersRepository)

	const user = await updateUserUseCase.execute({ id, email, login, nome, senha, telefone });

	if (user.isLeft())
		return reply
			.status(400)
			.send(user.value.error)

	return reply
		.status(201)
		.send(user.value.user);
}
