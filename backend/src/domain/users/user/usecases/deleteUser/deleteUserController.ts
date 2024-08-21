import { FastifyReply, FastifyRequest } from 'fastify';
import { UsersOracleRepository } from '../../repositories/userOracleRepository';
import { DeleteUserUseCase } from './deleteUserUseCase';
import { z } from 'zod';

export const createUserBodySchema = z.object({
	id: z.string(),
});

export async function deleteUserController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createUserBodySchema.parse(request.params);

	const usersRepository = new UsersOracleRepository()
	const deleteUserUseCase = new DeleteUserUseCase(usersRepository)
	const user = await deleteUserUseCase.execute({ id });

	if (user.isLeft())
		return reply
			.status(400)
			.send(user.value.error)

	return reply
		.status(201)
		.send(user.value.user);
}
