import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AtividadeFeitasOracleRepository } from '../../repositories/atividadeFeitaOracleRepository';
import { UpdateAtividadeFeitaUseCase } from './updateAtividadeFeitaUseCase';

export const updateAtividadeFeitaParamsSchema = z.object({
	id: z.string(),
});

export const updateAtividadeFeitaBodySchema = z.object({
	usuarioId: z.string().optional(),
	cursoId: z.string().optional(),
	dataMatricula: z.string().optional(),
});

export async function updateAtividadeFeitaController(request: FastifyRequest, reply: FastifyReply) {

	const data = updateAtividadeFeitaBodySchema.parse(request.body);
	const { id } = updateAtividadeFeitaParamsSchema.parse(request.params);

	const atividadeFeitasRepository = new AtividadeFeitasOracleRepository()
	const updateAtividadeFeitaUseCase = new UpdateAtividadeFeitaUseCase(atividadeFeitasRepository)

	const atividadeFeita = await updateAtividadeFeitaUseCase.execute({ id, data });

	if (atividadeFeita.isLeft())
		return reply
			.status(400)
			.send(atividadeFeita.value.error)

	return reply
		.status(201)
		.send(atividadeFeita.value.atividadeFeita);
}
