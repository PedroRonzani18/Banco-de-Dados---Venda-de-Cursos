import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { createIslandBodySchema } from '@/domain/cursos/island/usecases/createIsland/createIslandController';
import { AlternativasOracleRepository } from '../../repositories/alternativaOracleRepository';
import { CreateAlternativaUseCase } from './createAlternativaUseCase';

export const createAlternativaBodySchema = z.object({
	idAtividade: z.string(),
	numAtividade: z.number(),
	certa: z.boolean(),
	descricao: z.string(),
});

export async function createController(request: FastifyRequest, reply: FastifyReply) {

	const { certa, descricao, numAtividade, idAtividade } = createAlternativaBodySchema.parse(request.body);

	const alternativasRepository = new AlternativasOracleRepository()
	const createAlternativaUseCase = new CreateAlternativaUseCase(alternativasRepository)

	const alternativa = await createAlternativaUseCase.execute({ idAtividade, certa, descricao, numAtividade, });

	if (alternativa.isLeft())
		return reply
			.status(400)
			.send(alternativa.value.error)

	return reply
		.status(201)
		.send(alternativa.value.alternativa);
}
