import { FastifyReply, FastifyRequest } from 'fastify';
import { AtividadesOracleRepository } from '../../repositories/atividadeOracleRepository';
import { ListAtividadesUseCase } from './listAtividadesUseCase';

export async function listAtividadesController(request: FastifyRequest, reply: FastifyReply) {

	const atividadesRepository = new AtividadesOracleRepository()
    const listAtividadesUseCase = new ListAtividadesUseCase(atividadesRepository)

	const atividade = await listAtividadesUseCase.execute();

	if (atividade.isLeft())
		return reply
			.status(400)
			.send(atividade.value.error)

	return reply
		.status(201)
		.send(atividade.value.atividades);
}
