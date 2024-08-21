import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AlternativasOracleRepository } from '../../repositories/alternativaOracleRepository';
import { UpdateAlternativaUseCase } from './updateAlternativaUseCase';

export const updateAlternativaParamsSchema = z.object({
	id: z.string(),
});

export const updateAlternativaBodySchema = z.object({
	certa: z.boolean().optional(),
	descricao: z.string().optional(),
	numAtividade: z.number().optional(),
});

export async function updateAlternativaController(request: FastifyRequest, reply: FastifyReply) {

	const { certa, descricao, numAtividade } = updateAlternativaBodySchema.parse(request.body);
	const { id } = updateAlternativaParamsSchema.parse(request.params);

	const alternativasRepository = new AlternativasOracleRepository()
	const updateAlternativaUseCase = new UpdateAlternativaUseCase(alternativasRepository)

	const alternativa = await updateAlternativaUseCase.execute({ id, certa, descricao, numAtividade, });

	if (alternativa.isLeft())
		return reply
			.status(400)
			.send(alternativa.value.error)

	return reply
		.status(201)
		.send(alternativa.value.alternativa);
}
