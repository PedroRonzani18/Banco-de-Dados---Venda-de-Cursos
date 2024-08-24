import { FastifyReply, FastifyRequest } from 'fastify';
import { AtividadeFeitasOracleRepository } from '../../repositories/atividadeFeitaOracleRepository';
import { ListAtividadeFeitasUseCase } from './listAtividadeFeitasUseCase';

export async function listAtividadeFeitasController(request: FastifyRequest, reply: FastifyReply) {

	const atividadeFeitasRepository = new AtividadeFeitasOracleRepository()
    const listAtividadeFeitasUseCase = new ListAtividadeFeitasUseCase(atividadeFeitasRepository)

	const atividadeFeita = await listAtividadeFeitasUseCase.execute();

	if (atividadeFeita.isLeft())
		return reply
			.status(400)
			.send(atividadeFeita.value.error)

	return reply
		.status(201)
		.send(atividadeFeita.value.atividadeFeitas);
}
