import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AtividadeFeitasOracleRepository } from '../../repositories/atividadeFeitaOracleRepository';
import { CreateAtividadeFeitaUseCase } from './createAtividadeFeitaUseCase';

export const createAtividadeFeitaBodySchema = z.object({
	usuarioId: z.number(),
	atividadeId: z.number(),
	dataFinzalizacao: z.date(),
});

export async function createAtividadeFeitaController(request: FastifyRequest, reply: FastifyReply) {

	const { atividadeId, dataFinzalizacao, usuarioId } = createAtividadeFeitaBodySchema.parse(request.body);

	const atividadeFeitasRepository = new AtividadeFeitasOracleRepository()
	const createAtividadeFeitaUseCase = new CreateAtividadeFeitaUseCase(atividadeFeitasRepository)

	const atividadeFeita = await createAtividadeFeitaUseCase.execute({ atividadeId, dataFinzalizacao, usuarioId });

	if (atividadeFeita.isLeft())
		return reply
			.status(400)
			.send(atividadeFeita.value.error)

	return reply
		.status(201)
		.send(atividadeFeita.value.atividadeFeita);
}
