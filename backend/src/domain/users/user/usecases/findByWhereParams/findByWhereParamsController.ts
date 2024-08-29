import { FastifyReply, FastifyRequest } from 'fastify';
import { UsersOracleRepository } from '../../repositories/userOracleRepository';
import { FindUserByNameUseCase } from './findByWhereParamsUseCase';
import { z } from 'zod';

const keyValueSchema = z.object({
	key: z.string(),
	value: z.string()
});

export const findUserByNameBodySchema = z.object({
	params: z.array(keyValueSchema)
});

export async function findUserByNameController(request: FastifyRequest, reply: FastifyReply) {

    const { params } = findUserByNameBodySchema.parse(request.params);

	const usersRepository = new UsersOracleRepository()
    const findUserByNameUseCase = new FindUserByNameUseCase(usersRepository)

	const user = await findUserByNameUseCase.execute({ params });

	if (user.isLeft())
		return reply
			.status(400)
			.send(user.value.error)

	return reply
		.status(201)
		.send(user.value.users);
}
