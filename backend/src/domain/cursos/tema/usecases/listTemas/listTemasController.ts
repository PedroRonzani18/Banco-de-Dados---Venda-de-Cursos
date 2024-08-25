import { FastifyReply, FastifyRequest } from 'fastify';
import { TemasOracleRepository } from '../../repositories/temaOracleRepository';
import { ListTemasUseCase } from './listTemasUseCase';

export async function listTemasController(request: FastifyRequest, reply: FastifyReply) {

	const temasRepository = new TemasOracleRepository()
    const listTemasUseCase = new ListTemasUseCase(temasRepository)

	const tema = await listTemasUseCase.execute();

	if (tema.isLeft())
		return reply
			.status(400)
			.send(tema.value.error)

	return reply
		.status(201)
		.send(tema.value.temas);
}
