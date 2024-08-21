import { FastifyReply, FastifyRequest } from 'fastify';
import { AlternativasOracleRepository } from '../../repositories/alternativaOracleRepository';
import { z } from 'zod';
import { FindAlternativaByNumeroAtividadeIdUseCaseUseCase } from './findAlternativaByNumeroAtividadeIdUseCase';

export const createAlternativaBodySchema = z.object({
	idAtividade: z.string(),
	numAtividade: z.number(),
});

export async function findAlternativaByIdController(request: FastifyRequest, reply: FastifyReply) {

    const { idAtividade, numAtividade } = createAlternativaBodySchema.parse(request.params);

	const alternativasRepository = new AlternativasOracleRepository()
    const findAlternativaByIdUseCase = new FindAlternativaByNumeroAtividadeIdUseCaseUseCase(alternativasRepository)

	const alternativa = await findAlternativaByIdUseCase.execute({ idAtividade, numAtividade });

	if (alternativa.isLeft())
		return reply
			.status(400)
			.send(alternativa.value.error)

	return reply
		.status(201)
		.send(alternativa.value.alternativa);
}
