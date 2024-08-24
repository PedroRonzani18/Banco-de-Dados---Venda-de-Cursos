import { FastifyReply, FastifyRequest } from 'fastify';
import { AtividadeFeitasOracleRepository } from '../../repositories/atividadeFeitaOracleRepository';
import { z } from 'zod';
import { FindAtividadeFeitaByUsuarioAtividadeUseCase } from './findAtividadeFeitaByUsuarioAtividadeUseCase';

export const createAtividadeFeitaBodySchema = z.object({
	atividadeId: z.number(),
	usuarioId: z.number(),
});

export async function findAtividadeFeitaByTituloController(request: FastifyRequest, reply: FastifyReply) {

	const { atividadeId, usuarioId } = createAtividadeFeitaBodySchema.parse(request.body);

	const atividadeFeitasRepository = new AtividadeFeitasOracleRepository()
	const findAtividadeFeitaByIdUseCase = new FindAtividadeFeitaByUsuarioAtividadeUseCase(atividadeFeitasRepository)

	const atividadeFeita = await findAtividadeFeitaByIdUseCase.execute({ atividadeId, usuarioId });

	if (atividadeFeita.isLeft())
		return reply
			.status(400)
			.send(atividadeFeita.value.error)

	return reply
		.status(201)
		.send(atividadeFeita.value.atividadeFeita);
}
