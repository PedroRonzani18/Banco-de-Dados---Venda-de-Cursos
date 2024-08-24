import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AtividadesOracleRepository } from '../../repositories/atividadeOracleRepository';
import { UpdateAtividadeUseCase } from './updateAtividadeUseCase';

export const updateAtividadeParamsSchema = z.object({
	id: z.string(),
});

export const updateAtividadeBodySchema = z.object({
	enunciado: z.string().optional(),
	titulo: z.string().optional(),
});

export async function updateAtividadeController(request: FastifyRequest, reply: FastifyReply) {

	const { enunciado, titulo } = updateAtividadeBodySchema.parse(request.body);
	const { id } = updateAtividadeParamsSchema.parse(request.params);

	const atividadesRepository = new AtividadesOracleRepository()
	const updateAtividadeUseCase = new UpdateAtividadeUseCase(atividadesRepository)

	const atividade = await updateAtividadeUseCase.execute({ id, enunciado, titulo });

	if (atividade.isLeft())
		return reply
			.status(400)
			.send(atividade.value.error)

	return reply
		.status(201)
		.send(atividade.value.atividade);
}
