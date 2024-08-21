import { FastifyReply, FastifyRequest } from 'fastify';
import { UsersOracleRepository } from '../../repositories/userOracleRepository';
import { ListUsersUseCase } from './listUsersUseCase';

export async function listUsersController(request: FastifyRequest, reply: FastifyReply) {

	const usersRepository = new UsersOracleRepository()
    const listUsersUseCase = new ListUsersUseCase(usersRepository)

	const user = await listUsersUseCase.execute();

	if (user.isLeft())
		return reply
			.status(400)
			.send(user.value.error)

	return reply
		.status(201)
		.send(user.value.users);
}
