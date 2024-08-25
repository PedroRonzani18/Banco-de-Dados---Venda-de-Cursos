import { FastifyReply, FastifyRequest } from 'fastify';
import { TopicoTemasOracleRepository } from '../../repositories/topicoTemaOracleRepository';
import { ListTopicoTemasUseCase } from './listTopicoTemasUseCase';

export async function listTopicoTemasController(request: FastifyRequest, reply: FastifyReply) {

	const topicoTemasRepository = new TopicoTemasOracleRepository()
    const listTopicoTemasUseCase = new ListTopicoTemasUseCase(topicoTemasRepository)

	const topicoTema = await listTopicoTemasUseCase.execute();

	if (topicoTema.isLeft())
		return reply
			.status(400)
			.send(topicoTema.value.error)

	return reply
		.status(201)
		.send(topicoTema.value.topicoTemas);
}
