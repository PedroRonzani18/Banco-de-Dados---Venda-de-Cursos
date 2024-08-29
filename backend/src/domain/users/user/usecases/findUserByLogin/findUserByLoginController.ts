import { FastifyReply, FastifyRequest } from 'fastify';
import { UsersOracleRepository } from '../../repositories/userOracleRepository';
import { FindUserByLoginUseCase } from './findUserByLoginUseCase';
import { z } from 'zod';

export const createUserBodySchema = z.object({
	login: z.string(),
});

export async function findUserByloginController(request: FastifyRequest, reply: FastifyReply) {

    const { login } = createUserBodySchema.parse(request.params);

	const usersRepository = new UsersOracleRepository()
    const findUserByloginUseCase = new FindUserByLoginUseCase(usersRepository)

	const user = await findUserByloginUseCase.execute({ login });

	if (user.isLeft())
		return reply
			.status(400)
			.send(user.value.error)

	return reply
		.status(201)
		.send(user.value.user);
}
