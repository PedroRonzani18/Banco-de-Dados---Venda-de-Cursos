import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AulasOracleRepository } from '../../repositories/aulaOracleRepository';
import { UpdateAulaUseCase } from './updateAulaUseCase';

export const updateAulaParamsSchema = z.object({
	id: z.string(),
});

export const updateAulaBodySchema = z.object({
	enunciado: z.string().optional(),
	titulo: z.string().optional(),
});

export async function updateAulaController(request: FastifyRequest, reply: FastifyReply) {

	const { enunciado, titulo } = updateAulaBodySchema.parse(request.body);
	const { id } = updateAulaParamsSchema.parse(request.params);

	const aulasRepository = new AulasOracleRepository()
	const updateAulaUseCase = new UpdateAulaUseCase(aulasRepository)

	const aula = await updateAulaUseCase.execute({ id, enunciado, titulo });

	if (aula.isLeft())
		return reply
			.status(400)
			.send(aula.value.error)

	return reply
		.status(201)
		.send(aula.value.aula);
}
