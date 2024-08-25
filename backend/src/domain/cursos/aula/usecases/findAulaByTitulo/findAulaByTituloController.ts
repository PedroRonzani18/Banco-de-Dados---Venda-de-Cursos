import { FastifyReply, FastifyRequest } from 'fastify';
import { AulasOracleRepository } from '../../repositories/aulaOracleRepository';
import { z } from 'zod';
import { FindAulaByTituloUseCase } from './findAulaByTituloUseCase';

export const createAulaBodySchema = z.object({
	idTopico: z.number(),
	titulo: z.string(),
});

export async function findAulaByTituloController(request: FastifyRequest, reply: FastifyReply) {

    const { idTopico, titulo } = createAulaBodySchema.parse(request.body);

	const aulasRepository = new AulasOracleRepository()
    const findAulaByIdUseCase = new FindAulaByTituloUseCase(aulasRepository)

	const aula = await findAulaByIdUseCase.execute({ idTopico, titulo });

	if (aula.isLeft())
		return reply
			.status(400)
			.send(aula.value.error)

	return reply
		.status(201)
		.send(aula.value.aula);
}
