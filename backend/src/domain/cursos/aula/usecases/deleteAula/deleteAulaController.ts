import { FastifyReply, FastifyRequest } from 'fastify';
import { AulasOracleRepository } from '../../repositories/aulaOracleRepository';
import { DeleteAulaUseCase } from './deleteAulaUseCase';
import { z } from 'zod';

export const createAulaBodySchema = z.object({
	id: z.string(),
});

export async function deleteAulaController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createAulaBodySchema.parse(request.params);

	const aulasRepository = new AulasOracleRepository()
	const deleteAulaUseCase = new DeleteAulaUseCase(aulasRepository)
	const aula = await deleteAulaUseCase.execute({ id });

	if (aula.isLeft())
		return reply
			.status(400)
			.send(aula.value.error)

	return reply
		.status(201)
		.send(aula.value.aula);
}
