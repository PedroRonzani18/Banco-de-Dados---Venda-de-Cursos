import { FastifyReply, FastifyRequest } from 'fastify';
import { AlternativasOracleRepository } from '../../repositories/alternativaOracleRepository';
import { DeleteAlternativaUseCase } from './deleteAlternativaUseCase';
import { z } from 'zod';

export const createAlternativaBodySchema = z.object({
	id: z.number(),
});

export async function deleteAlternativaController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createAlternativaBodySchema.parse(request.params);

	const alternativasRepository = new AlternativasOracleRepository()
	const deleteAlternativaUseCase = new DeleteAlternativaUseCase(alternativasRepository)
	const alternativa = await deleteAlternativaUseCase.execute({ id });

	if (alternativa.isLeft())
		return reply
			.status(400)
			.send(alternativa.value.error)

	return reply
		.status(201)
		.send(alternativa.value.alternativa);
}
