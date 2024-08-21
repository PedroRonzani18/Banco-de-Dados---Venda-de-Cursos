import { FastifyReply, FastifyRequest } from 'fastify';
import { UsersOracleRepository } from '../../repositories/userOracleRepository';
import { z } from 'zod';
import { FindUserByIdUseCase } from './findUserByIdUseCase';

export const createUserBodySchema = z.object({
	id: z.string(),
});

export async function findUserByIdController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createUserBodySchema.parse(request.params);

	const usersRepository = new UsersOracleRepository()
    const findUserByIdUseCase = new FindUserByIdUseCase(usersRepository)

	const user = await findUserByIdUseCase.execute({ id });

	if (user.isLeft())
		return reply
			.status(400)
			.send(user.value.error)

	return reply
		.status(201)
		.send(user.value.user);
}
