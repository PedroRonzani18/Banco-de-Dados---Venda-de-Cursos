import { FastifyReply, FastifyRequest } from 'fastify';
import { UsersOracleRepository } from '../../repositories/userOracleRepository';
import { FindUserByNameUseCase } from './findUserByNameUseCase';
import { z } from 'zod';

export const createUserBodySchema = z.object({
	name: z.string(),
});

export async function findUserByNameController(request: FastifyRequest, reply: FastifyReply) {

    const { name } = createUserBodySchema.parse(request.params);

	const usersRepository = new UsersOracleRepository()
    const findUserByNameUseCase = new FindUserByNameUseCase(usersRepository)

	const user = await findUserByNameUseCase.execute({ name });

	if (user.isLeft())
		return reply
			.status(400)
			.send(user.value.error)

	return reply
		.status(201)
		.send(user.value.user);
}
