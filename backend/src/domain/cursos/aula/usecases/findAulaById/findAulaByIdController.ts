import { FastifyReply, FastifyRequest } from 'fastify';
import { AulasOracleRepository } from '../../repositories/aulaOracleRepository';
import { FindAulaByIdUseCase } from './findAulaByIdUseCase';
import { z } from 'zod';

export const createAulaBodySchema = z.object({
	id: z.string(),
});

export async function findAulaByIdController(request: FastifyRequest, reply: FastifyReply) {

    const { id } = createAulaBodySchema.parse(request.params);

	const aulasRepository = new AulasOracleRepository()
    const findAulaByIdUseCase = new FindAulaByIdUseCase(aulasRepository)

	const aula = await findAulaByIdUseCase.execute({ id });

	if (aula.isLeft())
		return reply
			.status(400)
			.send(aula.value.error)

	return reply
		.status(201)
		.send(aula.value.aula);
}
