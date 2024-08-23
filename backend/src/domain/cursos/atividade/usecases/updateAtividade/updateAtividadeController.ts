import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AtividadesOracleRepository } from '../../repositories/atividadeOracleRepository';
import { UpdateAtividadeUseCase } from './updateAtividadeUseCase';

export const updateAtividadeParamsSchema = z.object({
	id: z.string(),
});

export const updateAtividadeBodySchema = z.object({
	certa: z.boolean().optional(),
	descricao: z.string().optional(),
	numAtividade: z.number().optional(),
});

export async function updateAtividadeController(request: FastifyRequest, reply: FastifyReply) {

	const { certa, descricao, numAtividade } = updateAtividadeBodySchema.parse(request.body);
	const { id } = updateAtividadeParamsSchema.parse(request.params);

	const alternativasRepository = new AtividadesOracleRepository()
	const updateAtividadeUseCase = new UpdateAtividadeUseCase(alternativasRepository)

	const alternativa = await updateAtividadeUseCase.execute({ id, certa, descricao, numAtividade, });

	if (alternativa.isLeft())
		return reply
			.status(400)
			.send(alternativa.value.error)

	return reply
		.status(201)
		.send(alternativa.value.alternativa);
}
